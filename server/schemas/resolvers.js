const Profile = require("../models/Profile");
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const Cart = require("../models/Cart");
var mongoose = require('mongoose');
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('profile')
            }
            throw new AuthenticationError('You must be logged in.');
        },
        profile: async (parent, { its }) => {
            return Profile.findOne({ its: its });
        },
        cart: async (_, { userId }) => {
            return await Cart.findOne({ user: userId }).populate({
                path: "cartItems",
                populate: "product"
            }).populate("user");
        },
        product: async (parent, { productId }) => {
            return Product.findOne({ _id: productId });
        },
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId }).populate("profile");
        },
    },
    Mutation: {
        login: async (parent, args) => {
            const user = await User.findOne({ email: args.email });
            if (!user) {
                throw new AuthenticationError('User not found by that email.');
            }
            const correctPw = await user.isCorrectPassword(args.password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password.');
            }
            const token = signToken(user);
            return { token, user };
        },
        createProfile: async (parent, args) => {
            return Profile.create(args)
        },
        addUser: async (parent, args) => {
            const user = await User.findOne({ its: args.its });
            if (user) {
                throw new AuthenticationError("User already exists");
            } else {
                const profile = await Profile.findOne({ its: args.its });
                return User.create({ ...args, profile: mongoose.Types.ObjectId(profile._id) });
            }
        },
        addProduct: async (parent, args) => {
            return Product.create(args);
        },
        addToCart: async (_, { userId, productId, count }) => {
            let cart = await Cart.findOne({ user: userId });

            if (!cart) {
                cart = new Cart({ user: userId, cartItems: [], bill: 0 });
            }

            const product = await Product.findById(productId);
            if (!product) {
                throw new Error('Product not found');
            }
            console.log(cart.cartItems);
            const productIds = cart.cartItems.map(item => item.product && item.product.toString());
            console.log("product ids", productIds);
            console.log("product id", productId);
            if (productIds.includes(productId)) {
                const cartItem = cart.cartItems.find(item => item.product && item.product.toString() === productId);
                console.log(cartItem);
                console.log(cart);
                cartItem.count += count;
            } else {
                cart.cartItems.push({ product: productId, count });
            }
            console.log(cart.cartItems);

            cart.bill += product.price * count;

            await cart.save();
            return Cart.findOne({ user: userId }).populate({
                path: "cartItems",
                populate: "product"
            });
        },

        placeOrder: async (parent, { userId }) => {
            let cart = await Cart.findOne({ user: userId }).populate({
                path: "cartItems",
                populate: "product"
            });

            if (!cart || cart.cartItems.length === 0) {
                throw new Error('Cart is empty or does not exist');
            }

            const order = new Order({
                user: userId,
                orderItems: cart.cartItems.map(item => ({
                    product: item.product._id,
                    count: item.count
                }))
            });

            await order.save();

            cart.cartItems = [];
            cart.bill = 0;
            await cart.save();

            return order.populate({
                path: "orderItems",
                populate: "product"
            });
        },
    }
}

module.exports = resolvers;
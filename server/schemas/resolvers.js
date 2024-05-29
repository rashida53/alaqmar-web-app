const Profile = require("../models/Profile");
const Product = require("../models/Product");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Cart = require("../models/Cart");

const resolvers = {
    Query: {
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
        }
    },
    Mutation: {
        createProfile: async (parent, args) => {
            return Profile.create(args)
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
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
    }
}

module.exports = resolvers;
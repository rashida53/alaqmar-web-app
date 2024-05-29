const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Profile {
    _id: ID
    fullName: String!
    secondaryId: String
    its: String!
    kurta: String
    sleeve: String
    chest: String
    shoulders: String
    neck: String
    waist: String
    izaarLength: String
    hips: String
}

type User {
    _id: ID
    fullName: String!
    email: String
    password: String
    profile: Profile
}
type Product {
    _id: ID
    product_name: String!
    description: String
    image: String
    quantity: Int
    product_type: String
    price: Float
}

type CartItem {
    product: Product
    count: Int
}

type OrderItem {
    product: Product
    count: Int
}

type Cart {
    _id: ID!
    user: User
    cartItems: [CartItem]
    bill: Float
}

type Order {
    _id: ID
    user: User
    orderItems: [OrderItem]
}

type Query {
    profile(its: String!): Profile!
    user(userId: ID!): User!
    product(productId: String): Product
    cart(userId: ID!): Cart
}
type Mutation {
    createProfile(fullName: String!, secondaryId: String, its: String!, kurta: String, sleeve: String, chest: String, shoulders: String, waist: String, neck: String, izaarLength: String, hips: String): Profile
    addUser(fullName: String!, its: String, email: String, password: String): User
    addProduct(productId: ID, product_name: String, description: String, image: String, price: Float, quantity: Int, product_type: String): Product
    addToCart(userId: ID!, productId: ID!, count: Int!): Cart
    placeOrder(userId: ID!): Order
}
`
module.exports = typeDefs;
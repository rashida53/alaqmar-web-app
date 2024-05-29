const { Schema, model } = require('mongoose');

const productSchema = new Schema(
    {
        product_name: {
            type: String,
            required: true,
        },
        description: {
            type: String
        },
        image: {
            type: String
        },
        price: {
            type: Number
        },
        quantity: {
            type: Number
        },
        product_type: {
            type: String
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);
const Product = model('Product', productSchema);

module.exports = Product;
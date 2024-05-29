const { Schema, model } = require('mongoose');

const cartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        cartItems: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            count: {
                type: Number,
            }
        }],
        bill: {
            type: Number,
        }

    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);
const Cart = model('Cart', cartSchema);

module.exports = Cart;
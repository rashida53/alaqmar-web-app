const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        orderItems: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            count: {
                type: Number,
            }
        }],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);
const Order = model('Order', orderSchema);

module.exports = Order;
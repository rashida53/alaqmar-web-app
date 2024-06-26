const { Schema, model } = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        its: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, "Must be a valid email address"],
        },
        password: {
            type: String,
            required: true,
        },
        profile: {
            type: Schema.Types.ObjectId,
            ref: 'Profile'
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
const User = model('User', userSchema);

module.exports = User;
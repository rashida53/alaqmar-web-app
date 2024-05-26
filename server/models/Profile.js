const { Schema, model } = require('mongoose');

const profileSchema = new Schema(
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
        secondaryId: {
            type: String,
            unique: true,
        },
        contactNumber: {
            type: String,
        },
        kurta: {
            type: String,
        },
        sleeve: {
            type: String,
        },
        chest: {
            type: String,
        },
        shoulders: {
            type: String,
        },
        neck: {
            type: String,
        },
        waist: {
            type: String,
        },
        izaarLength: {
            type: String,
        },
        hips: {
            type: String,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);
const Profile = model('Profile', profileSchema);

module.exports = Profile;
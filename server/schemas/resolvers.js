const Profile = require("../models/Profile");

const resolvers = {
    Query: {
        profile: async (parent, { its }) => {
            return Profile.findOne({ its: its });
        },
    },
    Mutation: {
        createProfile: async (parent, args) => {
            console.log("Hello");
            return Profile.create(args)
        },
    }
}

module.exports = resolvers;
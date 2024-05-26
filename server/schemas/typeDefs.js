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
type Query {
    profile(its: String!): Profile!
}
type Mutation {
    createProfile(fullName: String!, secondaryId: String, its: String!, kurta: String, sleeve: String, chest: String, shoulders: String, waist: String, neck: String, izaarLength: String, hips: String): Profile
}
`
module.exports = typeDefs;
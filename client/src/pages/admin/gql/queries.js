import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query profile($its: String!) {
    profile(its: $its) {
      _id
    chest
    fullName
    its
    kurta
    hips
    izaarLength
    neck
    secondaryId
    shoulders
    sleeve
    waist
    }
  }
`
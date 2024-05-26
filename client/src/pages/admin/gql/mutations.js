import { gql } from "@apollo/client";

export const CREATE_PROFILE = gql`
    mutation createProfile($fullName: String!, $its: String!, $secondaryId: String, $kurta: String, $sleeve: String, $chest: String, $shoulders: String, $waist: String, $neck: String, $izaarLength: String, $hips: String) {
        createProfile(fullName: $fullName, its: $its, secondaryId: $secondaryId, kurta: $kurta, sleeve: $sleeve, chest: $chest, shoulders: $shoulders, waist: $waist, neck: $neck, izaarLength: $izaarLength, hips: $hips) {
            _id
            chest
            fullName
            hips
            its
            izaarLength
            kurta
            neck
            secondaryId
            shoulders
            sleeve
            waist
        }
    }
`
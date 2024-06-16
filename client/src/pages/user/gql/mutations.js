import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        me {
             _id
            email
            fullName
           }
        }
    }
`

export const ADD_USER = gql`
    mutation addUser($fullName: String!, $email: String!, $password: String!, $its: String!) {
        addUser(fullName: $fullName, email: $email, password: $password, its: $its) {
            token
            me {
                _id
                email
                fullName
            }
        }
    }    
`
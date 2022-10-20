import {gql} from "@apollo/client";

export const CREATE_SECTION_MUTATION = gql`
    mutation Mutation($input: String!) {
        createSection(input: $input) {
            title
            _id
        }
    }
`
export const UPDATE_SECTION_MUTATION = gql`
    mutation Mutation($input: SectionInput!) {
        updateSection(input: $input) {
            title
            _id
        }
    }
`
export const DELETE_SECTION_BY_ID_MUTATION = gql`
    mutation Mutation($id: ID!) {
        deleteSection(id: $id) {
            _id
            title
        }
    }
`
export const CREATE_TASK_MUTATION = gql`
    mutation Mutation($input: CreateTaskInput!) {
        createTask(input: $input) {
            description
        }
    }
`

export const DELETE_TASK_BY_ID_MUTATION = gql`
    mutation Mutation($id: ID!) {
        deleteTask(id: $id) {
            description
        }
    }
`

export const UPDATE_TASK_BY_ID_MUTATION = gql`
    mutation Mutation($input: EditTaskInput! ) {
        updateTask(input: $input) {
            description
        }
    }
`
export const SIGNUP_MUTATION = gql`
    mutation Signup($password: String!, $email: String!) {
        signup(password: $password, email: $email) {
            user {
                email
                _id
            }
        }
    }
`
export const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            user {
                _id
                email
            }
        }
    }
`
export const LOGOUT_MUTATION = gql`
    mutation Logout {
        logout
    }
`
export const CREATE_MESSAGE_MUTATION = gql`
    mutation CreateMessage($text: String!, $createdBy: String!) {
        createMessage(text: $text, createdBy: $createdBy) {
            text
            createdBy
        }
    }
`
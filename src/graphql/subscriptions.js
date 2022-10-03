import {gql} from "@apollo/client";

const MESSAGES_SUBSCRIPTION = gql`
    subscription MessageCreated {
        messageCreated {
            text
            createdBy
        }
    }
`
export default MESSAGES_SUBSCRIPTION
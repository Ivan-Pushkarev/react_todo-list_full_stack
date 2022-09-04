import {gql} from "@apollo/client";

 export const GET_SECTIONS = gql`
    query Sections {
        sectionsAll {
            _id
            title
            task {
                _id
                description
                video
                done
            }
        }
    }
`
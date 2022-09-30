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
export const CURRENT_USER_QUERY = gql`
 query CurrentUserQuery {
  currentUser {
   _id 
   email
  }
 }
`
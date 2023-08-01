import { gql } from '@apollo/client';

export const GET_ALL_ANIME = gql`
    query ($id: Int, $page: Int, $perPage: Int, $search: String) {
        Page (page: $page, perPage: $perPage) {
            pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
            }
            media (id: $id, search: $search) {
                id
                title {
                    romaji
                }
                coverImage{
                    large
                }
            }
        }
    }
`

export const GET_ANIME_BY_ID = gql`
    query ($id: Int) { # Define which variables will be used in the query (id)
        Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
            id
            title {
                romaji
                english
                native
            }
            description
            episodes
            genres
            averageScore
            coverImage {
                large
            }
        }
    }
`
import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { GET_ALL_ANIME } from "../queries/animeQueries";
import Grid from '@mui/material/Grid';

export default function MainPage(){

    const { loading, error, data } = useQuery(GET_ALL_ANIME, {
        variables: {
            page: 1,
            perPage: 10
        }
    });

    useEffect(() => {
        
    }, [])

    return(
        <>
            <Grid container spacing={3}>
                {data &&
                    <>
                        {data.Page.media.map((anime) => (
                            <Grid item xs={12} sm={4} md={3} style={{ textAlign: 'center' }}>
                                <Link to={`detail/${anime.id}`}>
                                    <img src={anime.coverImage.large} />
                                    <p> {anime.title.romaji} </p>
                                </Link>
                            </Grid>
                        ))}
                    </>
                }
            </Grid>
        </>
    )
}
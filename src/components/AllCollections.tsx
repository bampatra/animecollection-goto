import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { joinAnimeCollections } from "../services/collectionServices";

export default function AllCollections(){

    console.log(joinAnimeCollections())
    const [data, setData] = useState(joinAnimeCollections())

    return(
        <Grid container spacing={3}>
            {data &&
                <>
                    {data.map((collection) => (
                        <Grid item xs={12} sm={4} md={3} style={{ textAlign: 'center' }}>
                            <Link to={`/collection/${collection.id}`}>
                                <img src={collection.animeList.length > 0 ? collection.animeList[0].coverImage : '/default_movie.png'} />
                                <p> {collection.title} </p>
                            </Link>
                        </Grid>
                    ))}
                </>
            }
        </Grid>
    )
}
import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { getAllCollections } from "../services/collectionServices";

export default function AllCollections(){

    const [data, setData] = useState(getAllCollections())

    return(
        <Grid container spacing={3}>
            {data &&
                <>
                    {data.map((collection) => (
                        <Grid item xs={12} sm={4} md={3} style={{ textAlign: 'center' }}>
                            <Link to={`/collection/${collection.id}`}>
                                {/* <img src={anime.coverImage.large} /> */}
                                <p> {collection.title} </p>
                            </Link>
                        </Grid>
                    ))}
                </>
            }
        </Grid>
    )
}
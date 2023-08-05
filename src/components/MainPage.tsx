import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { GET_ALL_ANIME } from "../queries/animeQueries";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Pagination } from "@mui/material";

export default function MainPage(){

    const [page, setPage] = useState(1)

    const { loading, error, data } = useQuery(GET_ALL_ANIME, {
        variables: {
            page: page,
            perPage: 10
        }
    });

    useEffect(() => {
        
    }, [])

    return(
        <>
            <h1> Discover Anime </h1>
            <br/>
            <Grid container spacing={5}>
                {data &&
                    <>
                        {data.Page.media.map((anime) => (
                            <Grid item xs={12} sm={4} md={3}>
                                <Link to={`detail/${anime.id}`}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            alt="green iguana"
                                            height="350"
                                            image={anime.coverImage.large}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div" className="Title-text">
                                                {anime.title.romaji}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Grid>
                        ))}
                    </>
                }
            </Grid>
        </>
    )
}
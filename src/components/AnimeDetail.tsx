import * as React from "react"
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useQuery } from '@apollo/client';
import { GET_ANIME_BY_ID } from "../queries/animeQueries";

import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddToCollection from "./modals/AddToCollection";
import { getCollectionsInAnime } from "../services/collectionServices";
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { MasterCSS } from "../MasterStyling";

export default function AnimeDetail(){

    const { DescBox } = MasterCSS

    let { id } = useParams();

    const [listOfColletions, setListOfCol] = useState<{id, title}[]>([]);
    const [openCol, setOpenCol] = useState(false)

    const { loading, error, data } = useQuery(GET_ANIME_BY_ID, {
        variables: {
            id: id,
        }
    });

    useEffect(() => {
        setListOfCol(getCollectionsInAnime(id))
    }, [openCol])

    return(
        <>
            {data ?
                <Grid container spacing={5}>
                    <Grid item xs={12} md={3}>
                        <img src={data.Media.coverImage.large} />
                        <Button onClick={() => setOpenCol(true)} variant="contained" size="small" style={{ marginTop: '20px' }}> 
                            Add to Collection 
                        </Button>
                        {listOfColletions.length > 0 && (
                            <>
                                <p> Saved in: 
                                    <br />
                                    {listOfColletions.map((col, i) => (
                                        <span>
                                            <Link to={`/collection/${col.id}`}>
                                                <span style={{ textDecoration: 'underline' }}>{col.title}</span>
                                            </Link>
                                            {listOfColletions.length - 1 == i ? '' :', '}
                                        </span>
                                    ))}
                                </p>
                            </>
                        )}
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <h2>{data.Media.title.romaji || ''}</h2>
                        <DescBox>
                            <span dangerouslySetInnerHTML={{__html: data.Media.description || ''}}></span>
                        </DescBox>
                        
                        <p>Number of episodes: {data.Media.episodes}</p>
                        <p>Genres: {data.Media.genres.join(', ')}</p>
                        <p>Rating: {data.Media.averageScore}</p>
                        
                    </Grid>
                    
                    <Dialog 
                        open={openCol}
                        onClose={() => { setOpenCol(false) }}
                    >
                        <DialogTitle>

                        </DialogTitle>
                        <DialogContent>
                            <AddToCollection 
                                ids={[{
                                    ID: id,
                                    title: data.Media.title.romaji,
                                    coverImage: data.Media.coverImage.large
                                }]} 
                                closeAction={() => { setOpenCol(false) }} 
                                selected={listOfColletions}
                            />
                        </DialogContent>
                        <DialogActions>

                        </DialogActions>
                    </Dialog>
                </Grid>
            : 
                <>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={3}>
                            <Skeleton variant="rectangular" height={400} />
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Skeleton variant="rectangular" height={350} />
                        </Grid>
                    </Grid>
                </>
            }
            
        </>
    )
}
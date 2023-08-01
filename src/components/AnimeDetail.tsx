import * as React from "react"
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useQuery } from '@apollo/client';
import { GET_ANIME_BY_ID } from "../queries/animeQueries";

import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddToCollection from "./modals/AddToCollection";
import { getCollectionsInAnime } from "../services/collectionServices";

export default function AnimeDetail(){
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
            {data && 
                <>
                    <p>{data.Media.title.romaji || ''}</p>
                    <span>{data.Media.description || ''}</span>
                    <br/><br/>
                    <button onClick={() => setOpenCol(true)}> Add to Collection </button>
                
                    {listOfColletions.length > 0 && (
                        <>
                            <br/>
                            <span> Saved to: </span>
                            
                            {listOfColletions.map((col, i) => (
                                <span>
                                    <Link to={`/collection/${col.id}`}>
                                        {col.title}
                                    </Link>
                                    {listOfColletions.length - 1 == i ? '' :', '}
                                </span>
                            ))}
                        </>
                    )}

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
                </>
            }
            
        </>
    )
}
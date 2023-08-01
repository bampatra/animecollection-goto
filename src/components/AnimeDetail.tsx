import * as React from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery } from '@apollo/client';
import { GET_ANIME_BY_ID } from "../queries/animeQueries";

import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddToCollection from "./modals/AddToCollection";

export default function AnimeDetail(){
    let { id } = useParams();

    const [openCol, setOpenCol] = useState(false)

    const { loading, error, data } = useQuery(GET_ANIME_BY_ID, {
        variables: {
            id: id,
        }
    });

    return(
        <>
            {data && 
                <>
                    <p>{data.Media.title.romaji || ''}</p>
                    <span>{data.Media.description || ''}</span>
                    <br/><br/>
                    <button onClick={() => setOpenCol(true)}> Add to Collection </button>
                
    
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
                                    title: data.Media.title.romaji
                                }]} 
                                closeAction={() => { setOpenCol(false) }} 
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
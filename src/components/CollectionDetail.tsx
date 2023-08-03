import * as React from "react"
import Grid from '@mui/material/Grid';
import { useState, useEffect } from "react" 
import { Link, useParams } from "react-router-dom"
import { getCollectionDetail, getAnimesInCollection, removeAnimeFromCollection, editCollectionTitle } from "../services/collectionServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { colTitleCheck } from "../helpers/collectionHelpers";

export default function CollectionDetail(){
    let { id } = useParams();

    const [title, setTitle] = useState('')
    const [tempTitle, setTempTitle] = useState('')
    const [animes, setAnimes] = useState<{ID, title, coverImage}[]>([]);

    const [openDel, setOpenDel] = useState(false)
    const [toBeModified, setToBeModified] = useState({ID: '', title: ''})

    const [openEdit, setOpenEdit] = useState(false)

    function getMasterData(){
        const colDetail = getCollectionDetail(id);
        setTitle(colDetail.title)
        setAnimes(getAnimesInCollection(id))
    }

    function handleRemove(animeID){
        removeAnimeFromCollection(id, animeID, function(){
            setOpenDel(false)
            getMasterData()
        })
    }

    function handleSave(){
        if(!colTitleCheck(tempTitle)){
            alert('This title already exists or contains a special character')
            return;
        }

        editCollectionTitle(id, tempTitle, function(){
            setTitle(tempTitle)
            setOpenEdit(false)
        })
    }

    useEffect(() => {
        getMasterData()
     }, [])
 
     useEffect(() => {
         if(!openDel){
             setToBeModified({ID: '', title: ''})
         }
     }, [openDel])

     useEffect(() => {
        if(!openEdit){
            setTempTitle('')
        }
    }, [openEdit])
    

    return(
        <>
            <p>{title}</p>
            <p onClick={() => { setOpenEdit(true) }}> Edit Title </p>
            <Grid container spacing={1}>
                {animes.map((anime) => (
                    <Grid item xs={12} sm={6}>
                        <Link to={`/detail/${anime.ID}`}>
                            <Grid item xs={12} sm={5}>
                                <img src={anime.coverImage} />
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <p> {anime.title} </p>
                                <p onClick={(e) => {
                                    e.preventDefault()
                                    setToBeModified(anime)
                                    setOpenDel(true)
                                }}> Remove </p>
                            </Grid>
                        </Link>
                    </Grid>
                ))}
            </Grid>

            <Dialog 
                open={openEdit}
                onClose={() => { setOpenEdit(false) }}
            >
                <DialogTitle>
                    Edit title
                </DialogTitle>
                <DialogContent>
                    <input defaultValue={title} onChange={(e) => setTempTitle(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <button onClick={() => handleSave()}> Save </button>
                </DialogActions>
            </Dialog>

            {toBeModified && 
                <Dialog 
                    open={openDel}
                    onClose={() => { setOpenDel(false) }}
                >
                    <DialogTitle>
                        Delete Confirmation
                    </DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete {toBeModified.title}?
                    </DialogContent>
                    <DialogActions>
                        <button onClick={() => handleRemove(toBeModified.ID)}> Confirm </button>
                    </DialogActions>
                </Dialog>
            }
        </>
    )
}
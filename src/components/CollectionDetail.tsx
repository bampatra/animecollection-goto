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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';


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
            <h1 style={{ marginTop: '0px' }}>
                {title} <CreateIcon onClick={() => { setOpenEdit(true) }}/> 
            </h1>
            <Grid container spacing={3}>
                {animes.map((anime) => (
                    <Grid item xs={12} sm={4} md={3}>
                        <Card>
                            <Link to={`/detail/${anime.ID}`}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="350"
                                    image={anime.coverImage}
                                />
                            </Link>
                            <CardContent>
                                <Link to={`/detail/${anime.ID}`}>
                                    <Typography gutterBottom variant="h6" component="div" className="Title-text">
                                        {anime.title}
                                    </Typography>
                                </Link>
                            </CardContent>
                            <CardActions>
                                <Button 
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setToBeModified(anime)
                                        setOpenDel(true)
                                    }} size="small" color="error"> 
                                    Remove
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog 
                open={openEdit}
                onClose={() => { setOpenEdit(false) }}
                fullWidth
            >
                <DialogTitle>
                    Edit title
                </DialogTitle>
                <DialogContent>
                    <TextField
                        id="standard-multiline-static"
                        multiline
                        rows={1}
                        defaultValue={title}
                        variant="standard"
                        onChange={(e) => setTempTitle(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleSave()} size="small" variant="contained"> Save </Button>
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
                        <Button onClick={() => handleRemove(toBeModified.ID)} size="small" variant="contained" color="error"> Confirm </Button>
                    </DialogActions>
                </Dialog>
            }
        </>
    )
}
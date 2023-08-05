import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createCollection, deleteCollections, editCollectionTitle, joinAnimeCollections } from "../services/collectionServices";
import { colTitleCheck } from "../helpers/collectionHelpers";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from "@mui/material";

export default function AllCollections(){


    const [data, setData] = useState<{id, title, animeList}[]>([]);
    const [openCol, setOpenCol] = useState(false)
    const [newName, setNewName] = useState('')

    const [openDel, setOpenDel] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [toBeModified, setToBeModified] = useState({id: '', title: ''})

    function handleAdd(){
        
        if(!colTitleCheck(newName)){
            alert('This title already exists or contains a special character')
            return;
        }

        createCollection(newName, function(){
            setData(joinAnimeCollections());
            setOpenCol(false)
        })
    }

    function handleRemove(id){
        deleteCollections(id, function(){
            setOpenDel(false)
            getMasterData()
        })
    }

    function handleSave(id){

        if(!colTitleCheck(newName)){
            alert('This title already exists or contains a special character')
            return;
        }

        editCollectionTitle(id, newName, function(){
            setOpenEdit(false)
            getMasterData()
        })
    }

    function getMasterData(){
        setNewName('')
        setData(joinAnimeCollections());
    }

    useEffect(() => {
        getMasterData()
    }, [])

    useEffect(() => {
        setNewName(toBeModified.title)
    }, [toBeModified])

    useEffect(() => {
        if(!openDel && !openEdit){
            setToBeModified({id: '', title: ''})
        }
    }, [openDel, openEdit])

    return(
        <>
            <h1 style={{ marginTop: '0px' }}> My Collections </h1>
            <br/>
            <Button onClick={() => setOpenCol(true)} variant="contained"> Add a collection </Button>
            <br/><br/>
            <Grid container spacing={3}>
                {data &&
                    <>
                        {data.map((collection) => (
                            <Grid item xs={12} sm={4} md={3}>
                                <Card>
                                    <Link to={`/collection/${collection.id}`}>
                                        <CardMedia
                                            component="img"
                                            alt="green iguana"
                                            height="350"
                                            image={collection.animeList && collection.animeList.length > 0 ? collection.animeList[0].coverImage : '/default_movie.png'}
                                        />
                                    </Link>
                                    <CardContent>
                                        <Link to={`/collection/${collection.id}`}>
                                            <Typography gutterBottom variant="h6" component="div">{collection.title}</Typography>
                                        </Link>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={() => { setToBeModified(collection); setOpenDel(true);  }} size="small" color="error">Delete</Button>
                                        <Button onClick={() => { setToBeModified(collection); setOpenEdit(true);  }} size="small">Edit</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </>
                }
            </Grid>

            <Dialog 
                open={openCol}
                onClose={() => { setOpenCol(false) }}
            >
                <DialogTitle>
                    Enter the title for your new collection
                </DialogTitle>
                <DialogContent>
                    <TextField
                        id="standard-multiline-static"
                        multiline
                        rows={1}
                        value={newName} 
                        variant="standard"
                        onChange={(e) => setNewName(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAdd}> Save </Button>
                </DialogActions>
            </Dialog>

            {toBeModified && 
                <>
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
                            <Button onClick={() => handleRemove(toBeModified.id)} color="error" size="small" variant="contained"> 
                                Confirm 
                            </Button>
                        </DialogActions>
                    </Dialog>

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
                                defaultValue={toBeModified.title}
                                variant="standard"
                                onChange={(e) => setNewName(e.target.value)}
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleSave(toBeModified.id)}> Save </Button>
                        </DialogActions>
                    </Dialog>
                </>
            }
            
        </>
    )
}
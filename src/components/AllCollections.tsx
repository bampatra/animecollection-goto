import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createCollection, deleteCollections, joinAnimeCollections } from "../services/collectionServices";
import { colTitleCheck } from "../helpers/collectionHelpers";

export default function AllCollections(){


    const [data, setData] = useState<{id, title, animeList}[]>([]);
    const [openCol, setOpenCol] = useState(false)
    const [newName, setNewName] = useState('')

    const [openDel, setOpenDel] = useState(false)
    const [toBeDeleted, setToBeDeleted] = useState({id: '', title: ''})

    function handleAdd(){
        
        if(!colTitleCheck(newName)){
            alert('This title already exists or contains a special character')
            return;
        }

        createCollection(newName, function(){
            setData(joinAnimeCollections());
            setNewName('')
            setOpenCol(false)
        })
    }

    function handleRemove(id){
        deleteCollections(id, function(){
            setOpenDel(false)
            getMasterData()
        })
    }

    function getMasterData(){
        setData(joinAnimeCollections());
    }

    useEffect(() => {
        getMasterData()
    }, [])

    useEffect(() => {
        if(!openDel){
            setToBeDeleted({id: '', title: ''})
        }
    }, [openDel])

    return(
        <>
            <br/>
            <button onClick={() => setOpenCol(true)}> Add a collection </button>
            <br/><br/>
            <Grid container spacing={3}>
                {data &&
                    <>
                        {data.map((collection) => (
                            <Grid item xs={12} sm={4} md={3} style={{ textAlign: 'center' }}>
                                <Link to={`/collection/${collection.id}`}>
                                    <img src={collection.animeList && collection.animeList.length > 0 ? collection.animeList[0].coverImage : '/default_movie.png'} />
                                    <p> {collection.title} </p>
                                </Link>
                                <p onClick={() => { setToBeDeleted(collection); setOpenDel(true);  }}> Delete </p>
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
                    <input value={newName} onChange={(e) => setNewName(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <button onClick={handleAdd}> Save </button>
                </DialogActions>
            </Dialog>

            {toBeDeleted && 
                <Dialog 
                    open={openDel}
                    onClose={() => { setOpenDel(false) }}
                >
                    <DialogTitle>
                        Delete Confirmation
                    </DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete {toBeDeleted.title}?
                    </DialogContent>
                    <DialogActions>
                        <button onClick={() => handleRemove(toBeDeleted.id)}> Confirm </button>
                    </DialogActions>
                </Dialog>
            }
            
        </>
    )
}
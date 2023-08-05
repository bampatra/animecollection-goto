import * as React from "react"
import { useState, useEffect } from "react"
import { modifyCollections, createCollection } from "../../services/collectionServices"
import { Button } from "@mui/material";
import { colTitleCheck } from "../../helpers/collectionHelpers";

export default function AddToCollection({ids, closeAction, selected}){
    const [initCols, setInitCols] = useState<number[]>([]);
    const [collections, setCollections] = useState(JSON.parse(localStorage.getItem('collections') || '{}'))
    const [selectedCols, setSelectedCols] = useState<number[]>([]);

    function handleNewCol(){
        let title = "New Collection"
        
        if(!colTitleCheck(title)){
            let i = 1;
            while(i < 100){
                let checkStr = `${title} ${i}`
                if(colTitleCheck(checkStr)){
                    title = checkStr
                    break;
                }
                i++;
            }

        }

        createCollection(title, function(data){
            setCollections(data)
        })
    }

    function saveCols(){ 
        console.log(selectedCols)
        modifyCollections(selectedCols, ids, function(){
            closeAction()
            setSelectedCols([])
        })
    }

    function handleChangeCheckbox(e){
        const { value, checked } = e.target;
        const id = parseInt(value)

        if (checked) {
            setSelectedCols([...selectedCols, id]);
        } else {
            setSelectedCols(selectedCols.filter((e) => e !== id));
        }
    }

    useEffect(() => {
        var temp: any[] = [];
        selected.map((col) => {
            temp.push(col.id)
        })
        // setSelectedCols(temp)
        setInitCols(temp)
    }, [])


    return(
        <>
            {(collections && collections.length > 0) ? 
                <form>
                    {collections.map((col) => (
                        !initCols.includes(col.id) && (
                            <p>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="collections"
                                    value={col.id}
                                    id="flexCheckDefault"
                                    onChange={handleChangeCheckbox}
                                    checked={selectedCols.includes(col.id)}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefault"
                                >
                                    {col.title}
                                </label>
                            </p>
                        )
                    ))}
                </form>
            : 
                <p>
                    No Collections Found
                </p>
            }

            <Button onClick={handleNewCol} variant="outlined" size="small" sx={{ marginRight: 1 }}> Add a new collection </Button>
            <Button onClick={saveCols} variant="contained" size="small"> Save </Button>
        </>
    )
}
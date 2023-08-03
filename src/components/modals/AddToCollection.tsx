import * as React from "react"
import { useState, useEffect } from "react"
import { modifyCollections, createCollection } from "../../services/collectionServices"

export default function AddToCollection({ids, closeAction, selected}){
    const [initCols, setInitCols] = useState<number[]>([]);
    const [collections, setCollections] = useState(JSON.parse(localStorage.getItem('collections') || '{}'))
    const [selectedCols, setSelectedCols] = useState<number[]>([]);

    function handleNewCol(){
        createCollection("New Collection", function(data){
            setCollections(data)
        })
    }

    function saveCols(){ 
        modifyCollections(selectedCols, ids, function(){
            closeAction()
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
        setSelectedCols(temp)
        setInitCols(temp)
    }, [])


    return(
        <>
            {(collections && collections.length > 0) && 
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
            }

            <p onClick={handleNewCol}> Add a new collection </p>

            <button onClick={saveCols}> Save </button>
        </>
    )
}
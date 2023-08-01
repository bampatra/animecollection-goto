import * as React from "react"
import { useState, useEffect } from "react"
import { modifyCollections, createCollection } from "../../services/collectionServices"

export default function AddToCollection({ids, closeAction}){
    const [collections, setCollections] = useState(JSON.parse(localStorage.getItem('collections') || '{}'))
    const [selectedCols, setSelectedCols] = useState<string[]>([]);

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

        if (checked) {
            setSelectedCols([...selectedCols, value]);
        } else {
            setSelectedCols(selectedCols.filter((e) => e !== value));
        }
    }

    useEffect(() => {
   
    }, [])

    return(
        <>
            {(collections && collections.length > 0) && 
                <form>
                    {collections.map((col) => (
                        <p>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="collections"
                                value={col.id}
                                id="flexCheckDefault"
                                onChange={handleChangeCheckbox}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault"
                            >
                                {col.title}
                            </label>
                        </p>
                    ))}
                </form>
            }

            <p onClick={handleNewCol}> Add a new collection </p>

            <button onClick={saveCols}> Save </button>
        </>
    )
}
import * as React from "react"
import { useState, useEffect } from "react" 
import { useParams } from "react-router-dom"
import { getCollectionDetail, getAnimesInCollection } from "../services/collectionServices";

export default function CollectionDetail(){
    let { id } = useParams();

    const [title, setTitle] = useState('')

    useEffect(() => {
        const data = getCollectionDetail(id);
        setTitle(data.title)
    }, [])

    return(
        <>
            <p>{title}</p>
        </>
    )
}
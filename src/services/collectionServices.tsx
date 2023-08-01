export function createCollection(title, callback){
    var existingCollections = JSON.parse(localStorage.getItem('collections') || '{}');
    if(Object.keys(existingCollections).length === 0) existingCollections = []

    const d = new Date();
    let time = d.getTime();

    var newValue = {
        id: time + Math.floor(Math.random() * 100000),
        title: title,
    }

    existingCollections.push(newValue);
    localStorage.setItem("collections", JSON.stringify(existingCollections));
    callback(existingCollections)
}

export function getAllCollections(){
    var existingCollections = JSON.parse(localStorage.getItem('collections') || '{}');
    return existingCollections;
}

export function getCollectionDetail(id){
    var existingCollections = JSON.parse(localStorage.getItem('collections') || '{}');
    var obj = existingCollections.filter((obj => obj.id == id));
    return obj[0];
}

export function getAnimesInCollection(id){

}

export function modifyCollections(collectionIDs, animes, callback){
    if(collectionIDs.length != 0 && animes.length != 0){

        collectionIDs.map((col) => {
            var existingCollections = JSON.parse(localStorage.getItem('anime_collections') || '{}');

            if(Object.keys(existingCollections).length === 0){
                existingCollections = [] 
                var newValue = {
                    collectionID: col,
                    animeList: animes
                }
                existingCollections.push(newValue);
                
            } else {
                var objIndex = existingCollections.findIndex((obj => obj.collectionID == col));

                if(objIndex > -1){
                    var animeList = existingCollections[objIndex].animeList
                    animeList.push(animes)
                    // existingCollections[objIndex].animeList = animeList
                } else {
                    var newValue = {
                        collectionID: col,
                        animeList: animes
                    }
                    existingCollections.push(newValue);
                }
            }

            localStorage.setItem("anime_collections", JSON.stringify(existingCollections));
        })

     
    }

    callback()
    
}

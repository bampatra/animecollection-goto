
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
    var existingCollections = JSON.parse(localStorage.getItem('collections') || '[]');
    var obj = existingCollections.filter((obj => obj.id == id));
    return obj[0];
}

export function joinAnimeCollections(){
    var collections = JSON.parse(localStorage.getItem('collections') || '[]');
    var anime_collections = JSON.parse(localStorage.getItem('anime_collections') || '[]');

    var joined = collections.map(function(e) {
        return Object.assign({}, e, anime_collections.reduce(function(acc, val) {
            if (e.id == val.collectionID) {
                return {
                    id: e.id,
                    title: e.title,
                    animeList: val.animeList
                }
            } else {
                return {
                    id: e.id,
                    title: e.title,
                    animeList: acc.animeList || []
                }
            }
        }, {}))
    });

    return joined;
}

export function getAnimesInCollection(colID){
    var anime_collections = joinAnimeCollections();
    var results = []
    const searchObj = anime_collections.find(x => x.id == colID)

    if(searchObj.animeList) results = searchObj.animeList
    return results;
}

export function getCollectionsInAnime(animeID){
    const joinData = joinAnimeCollections()
    const listOfCollections: {id, title}[] = []

    if(joinData){
        joinData.map((data) => {
            if(data.animeList){
                data.animeList.map((anime) => {
                    if(anime.ID == animeID){
                        listOfCollections.push({
                            id: data.id,
                            title: data.title
                        })
                    }
                })
            }
        })
    }

    return listOfCollections;
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
                    animes.map((anime) => {
                        animeList.push(anime)
                    })
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

export function deleteCollections(id, callback){
    var collections = JSON.parse(localStorage.getItem('collections') || '[]');
    var anime_collections = JSON.parse(localStorage.getItem('anime_collections') || '[]');

    var indexA = collections.findIndex((obj => obj.id == id));
    var indexB = anime_collections.findIndex((obj => obj.collectionID == id));

    if (indexA > -1)  collections.splice(indexA, 1)
    if (indexB > -1)  anime_collections.splice(indexB, 1)

    localStorage.setItem('collections', JSON.stringify(collections))
    localStorage.setItem('anime_collections', JSON.stringify(anime_collections))

    callback()
}

export function removeAnimeFromCollection(colID, animeID, callback){
    var anime_collections = JSON.parse(localStorage.getItem('anime_collections') || '[]');
    var indexA = anime_collections.findIndex((obj => obj.collectionID == colID));
    var animeList = anime_collections[indexA].animeList;
    var indexB = animeList.findIndex((obj => obj.ID == animeID));

    if (indexB > -1)  animeList.splice(indexB, 1)

    localStorage.setItem('anime_collections', JSON.stringify(anime_collections))

    callback()
}

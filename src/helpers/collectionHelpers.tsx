
export function colTitleCheck(title){
    var bool = true;

    var specChar = title.match(/[^\w\s]/gi)

    if(specChar){ return false}

    var collections = JSON.parse(localStorage.getItem('collections') || '{}');
    collections.map((col) => {
        if(col.title.toLowerCase() == title.toLowerCase()){
            bool = false;
        }
    })

    return bool;
}
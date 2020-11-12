const getLocalStorage=(item,type)=>{
    switch(type){
        case "string": return localStorage.getItem(item)
        case "object": return JSON.parse(localStorage.getItem(item))
    }
}

export default getLocalStorage;
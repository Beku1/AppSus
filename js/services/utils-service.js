export const utilService = {
    saveToStorage,
    loadFromStorage,
    makeId,
    sortTitle,
    sortDate,
    sortMail
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key);
    return (data) ? JSON.parse(data) : undefined;
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function sortDate(entities){
    console.log(entities)
let sortedEntities = entities.sort((a,b)=>{
    if(a.sentAt < b.sentAt) { return -1; }
    if(a.sentAt > b.sentAt) { return 1; }
    return 0;
})
console.log(sortedEntities)
return sortedEntities
}

function sortMail(entities,key,isBackwards){
 
    if(isBackwards){var sortedEntities = entities.sort((a,b)=>{
      
        if(a[key] < b[key]) { return -1; }
        if(a[key] > b[key]) { return 1; }
        return 0;
})
console.log(isBackwards)
console.log(entities)
console.log(sortedEntities)
return sortedEntities
    }
 else{
 console.log(isBackwards)
console.log(entities)

    var sortedEntities = entities.sort((a,b)=>{
        if(a[key] < b[key]) { return 1; }
        if(a[key] > b[key]) { return -1; }
        return 0;
})
console.log(sortedEntities)
 return sortedEntities
 }
}

function sortTitle(entities){
    console.log(entities)
  let sortedEntities = entities.sort((a,b)=>{
    if(a.title < b.title) { return -1; }
    if(a.title > b.title) { return 1; }
    return 0;
  })
  console.log(sortedEntities)
    return sortedEntities
}
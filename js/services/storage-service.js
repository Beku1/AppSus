import { storageService } from "./async-storage-service.js"


export const basicStorageService = {
    getUnreadCount,
    watchToEmbed
}

function getUnreadCount(){
return storageService.query('mails')
.then((mails)=>{
    let count = 0
    mails.forEach((mail)=>{
      
        if(!mail.isRead) count++
    })
    return count
})
}
function watchToEmbed(vidUrl){
    console.log('origin',vidUrl);
  
    if(vidUrl.includes('watch')){
      
       vidUrl = vidUrl.replace(/watch\?v=/g, "embed/")
    }
    console.log('from new function',vidUrl);
    return vidUrl
  
  }
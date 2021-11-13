import { storageService } from "./async-storage-service.js"


export const basicStorageService = {
    getUnreadCount
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
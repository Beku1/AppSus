import {mails} from '../data/mails.js'
import {user} from '../data/user.js'
import { storageService } from '../../../services/async-storage-service.js'
import { utilService } from '../../../services/utils-service.js'

const MAILS_KEY = 'mails'
const USER_KEY = 'user'
_createMails()

export const mailService = {
 query,
 getById,
 removeMail,
 put,
 createNewMail,
 post,
 sortBy
}


function query(){
  return storageService.query(MAILS_KEY)
}




function _createMails(){
  let newMails = utilService.loadFromStorage(MAILS_KEY)
  if(!newMails || !newMails.length){
    newMails = mails
    utilService.saveToStorage(MAILS_KEY,newMails)
  }
  return newMails
}



function createNewMail() {
  let getUser = query(USER_KEY)

  let newMail = {
     title:'',
     info:{
       txt:'',
       imgUrl:null,
       vidUrl:null,
     },
     labels:[],
     isRead:false,
     isStared:false,
     to:'',
     from:getUser.email,
     status:'draft'

   }
   storageService.post(MAILS_KEY, newMail);
   return newMail
}


// {
//   id: "e101",
//   title: "YOU ARE AMAZING!",
//   info: {
//     txt: "Fullstack Me Baby!",
//     imgUrl: IMG_URL,
//     vidUrl: VIDEO_URL,
//     labels: ["important", "romantic"],
//   },
//   isRead: false,
//   isStared: false,
//   sentAt: 1551133930594,
//   to: "you@are.amazaing.com",
//   from:"user@appsus.com",
//   status: "inbox || sent || trash || draft",
//  },


function getById(mailId){
 return storageService.get(MAILS_KEY,mailId)
}

function put(mail){
  return storageService.put(MAILS_KEY,mail)
}

function post(mail){
  return storageService.post(MAILS_KEY,mail)
}

function sortBy(type,isBackwards){
  return query()
  .then(entities => {
  
     var sorted = utilService.sortMail(entities,type,isBackwards)
   return storageService.sortBy(MAILS_KEY,sorted) 
  })
  
}

function removeMail(mail){
  
  if(mail.status !== 'trash'){
     mail.status = 'trash'
    return  storageService.put(MAILS_KEY,mail)
  } 
  
 return storageService.remove(MAILS_KEY,mail.id)
}
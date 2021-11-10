import {mails} from '../data/mails.js'
import {user} from '../data/user.js'
import { storageService } from '../../../services/async-storage-service.js'
import { utilService } from '../../../services/utils-service.js'

const MAILS_KEY = 'mails'
const USER_KEY = 'user'
_createMails()

export const mailService = {
 query,
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
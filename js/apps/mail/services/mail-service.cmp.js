import { mails } from '../data/mails.js'
import { user } from '../data/user.js'
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
  sortBy,
  putFirst,
  mailFilterBy,
  mailFilterByStar,
  queryStringify
}

function mailFilterBy(filterByOps) {
  let filterBy = filterByOps
  var folderType = filterBy.folder
  return query().then((mails) => {
    if (filterBy.txt) var txt = filterBy.txt.toLowerCase()
    var read = filterBy.read
    if (filterBy.read === '') read = 'all'
     if(!mails.length || !mails) return
    let filteredMails = mails.filter((mail) => {
     
      var mailTitle = mail.title.toLowerCase()
     if(mail.info.txt !=='') var mailTxt = mail.info.txt
     else var mailTxt = mail.info.txt
      var mailFolder = mail.status

      if ((txt === '' || !txt) && read === 'all' && mailFolder === folderType)
        return mail
      else if ((txt === '' || !txt) && read && mailFolder === folderType)
        return mail.isRead
      else if ((txt === '' || !txt) && !read && mailFolder === folderType)
        return !mail.isRead
      else if (txt && read === 'all')
        return mailTxt.includes(txt) || mailTitle.includes(txt)
      else
        return (
          mail.isRead == read &&
          (mailTxt.includes(txt) || mailTitle.includes(txt)) &&
          mailFolder === folderType
        )
    })
    return filteredMails
  })
}


function queryStringify(query){
query.content = query.content.split('^')
query.content = query.content.join(' ')
query.title = query.title.split('^')
query.title = query.title.join(' ')
return query
} 

function mailFilterByStar() {
  return query().then((mails) => {
    let staredMails = mails.filter((mail) => {
      return mail.isStared
    })

    return staredMails
  })
}

function query() {
  return storageService.query(MAILS_KEY)
}

function _createMails() {
  let newMails = utilService.loadFromStorage(MAILS_KEY)
  if (!newMails || !newMails.length) {
    newMails = mails
    utilService.saveToStorage(MAILS_KEY, newMails)
  }
  return newMails
}

function createNewMail() {
  let getUser = query(USER_KEY)

  let newMail = {
    title: '',
    info: {
      txt: '',
      imgUrl: null,
      vidUrl: null,
    },
    labels: [],
    isRead: true,
    isStared: false,
    to: '',
    from: getUser.email,
    status: 'draft',
  }
  storageService.post(MAILS_KEY, newMail)
  return newMail
}

function getById(mailId) {
  return storageService.get(MAILS_KEY, mailId)
}

function put(mail) {
  return storageService.put(MAILS_KEY, mail)
}

function putFirst(mail) {
  return storageService.putFirst(MAILS_KEY, mail)
}

function post(mail) {
  return storageService.post(MAILS_KEY, mail)
}

function sortBy(type, isBackwards) {
  return query().then((entities) => {
    var sorted = utilService.sortMail(entities, type, isBackwards)
    return storageService.sortBy(MAILS_KEY, sorted)
  })
}

function removeMail(mail) {
  if (mail.status !== 'trash') {
    mail.status = 'trash'
    return storageService.put(MAILS_KEY, mail)
  }

  return storageService.remove(MAILS_KEY, mail.id)
}

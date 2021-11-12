import {mailService} from '../services/mail-service.cmp.js'
// import mailCompose from '../cmps/mail-compose.cmp.js'
// import mailFilter from '../cmps/mail-filter.cmp.js'
import mailList from '../cmps/mail-list.cmp.js'
import mailFolderList from '../cmps/mail-folder-list.cmp.js'
import { eventBus } from '../../../services/event-bus-service.js'
import userMsg from '../../../cmps/user-msg.cmp.js'
import mailFilter from '../cmps/mail-filter.cmp.js'


export default {
components:{
    // mailCompose,
    mailFilter,
    mailFolderList,
    mailList,
    userMsg
},
template:`
    <section class="mail-app-main">
        <user-msg/>
        <mail-filter @filtered="setFilter" @sorted="setSort"/>
         <mail-folder-list />
        <mail-list :mails="mails"/>
    </section>
`, 
data(){
    return {
     mails:null,
     filterBy:null

    }
},
created(){
    this.loadMails()
    eventBus.$on('getMails',this.loadMails)
   
},
 methods:{
    loadMails(){
      return mailService.query()
      .then(mails=>{
          this.mails = mails
          let unreadCount = 0
          this.mails.forEach(mail=> {
          if(!mail.isRead) unreadCount++})
          eventBus.$emit('unreadCount',unreadCount)
          return mails
      })
    },
    setFilter(filterBy){
        this.filterBy = filterBy
     this.loadMails()
     .then(mails =>{
         
        if(filterBy.txt) var txt = filterBy.txt.toLowerCase()
         var read = filterBy.read
         if(filterBy.read==='')  read = 'all'
         
         
         
        let filteredMails = mails.filter(mail=>{
            var mailTitle = mail.title.toLowerCase()
            var mailTxt = mail.info.txt.toLowerCase()
            if((txt==='' || !txt )&& read==='all') return mail
            else if((txt==='' || !txt )&& read) return mail.isRead
            else if((txt==='' || !txt ) && !read) return !mail.isRead
            else if(txt && read === 'all') return (mailTxt.includes(txt) || mailTitle.includes(txt))
            else return mail.isRead == read && (mailTxt.includes(txt) || mailTitle.includes(txt))
        })
         this.mails = filteredMails
     })
    },
      setSort(sortBy = 'date',isBackwards = false){
          if(sortBy === 'title') return _.orderBy(this.mails,'title')
          else return _.orderBy(this.mail,'sentAt')

      }
    },
    computed:{
       
    }

}

// filterBy:{
//     txt:null,
//     read:null,
// }
// {
//     id: "e101",
//     title: "YOU ARE AMAZING!",
//     info: {
//       txt: "Fullstack Me Baby!",
//       imgUrl: IMG_URL,
//       vidUrl: VIDEO_URL,
//       lables: ["important", "romantic"],
//     },
//     isRead: false,
//     isStared: false,
//     sentAt: 1551133930594,
//     to: "you@are.amazaing.com",
//     status: "inbox || sent || trash || draft",
//    },
import {mailService} from '../services/mail-service.cmp.js'
// import mailCompose from '../cmps/mail-compose.cmp.js'
// import mailFilter from '../cmps/mail-filter.cmp.js'
import mailList from '../cmps/mail-list.cmp.js'
import mailFolderList from '../cmps/mail-folder-list.cmp.js'
import { eventBus } from '../../../services/event-bus-service.js'
import userMsg from '../../../cmps/user-msg.cmp.js'


export default {
components:{
    // mailCompose,
    // mailFilter,
    mailFolderList,
    mailList,
    userMsg
},
template:`
    <section class="mail-app-main">
        <user-msg/>
    <router-view></router-view>
         <mail-folder-list />
        <mail-list :mails="mails"/>
    </section>
`, 
data(){
    return {
     mails:null,
    }
},
created(){
    this.loadMails()
    eventBus.$on('getMails',this.loadMails)
   
},
 methods:{
    loadMails(){
      mailService.query()
      .then(mails=>{
          this.mails = mails
          let unreadCount = 0
          this.mails.forEach(mail=> {
          if(!mail.isRead) unreadCount++})
          eventBus.$emit('unreadCount',unreadCount)
      })
    }
    },

}

// { <mail-filter/>
//     <mail-folder-list />
//     <mail-compose />
// }
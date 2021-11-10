import {mailService} from '../services/mail-service.cmp.js'
// import mailCompose from '../cmps/mail-compose.cmp.js'
// import mailFilter from '../cmps/mail-filter.cmp.js'
import mailList from '../cmps/mail-list.cmp.js'
// import mailFolderList from '../cmps/mail-folder-list.cmp.js'


export default {
components:{
    // mailCompose,
    // mailFilter,
    // mailFolderList,
    mailList
},
template:`
    <section class="mail-app-main">

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
},
 methods:{
    loadMails(){
      mailService.query()
      .then(mails=>{
          this.mails = mails
      })
    }
    },

}

// { <mail-filter/>
//     <mail-folder-list />
//     <mail-compose />
// }
import { mailService } from '../services/mail-service.cmp.js'
import { eventBus } from '../../../services/event-bus-service.js'
import mailFolderList from '../cmps/mail-folder-list.cmp.js'

export default {
  components: {
    mailFolderList,
  },
  template: `
    
    <section class="mail-details" v-if="mail">
    <router-view></router-view>
        <div>
        <mail-folder-list :mail="mail"/>
        </div>
        <div class="mail-details-header" >
    <h3>{{mail.title}} <button >Label</button></h3>
   
    <div>
    <label v-show="isLabeled" v-for="label in mail.info.labels"> {{label}}</label>
</div></div>
 <div class="mail-details-info">
     <div class="mail-details-from-to">
   <span > From: {{mail.from}}</span><span>To: {{mail.to}}</span>
 </div>
    <p> {{whenSent}} </p>
    <button @click="starMail">star</button>
    <!-- TO DO REPLY -->
    
    <button>reply</button>  
    <button v-show="mail.isRead" @click="toggleRead"><i class="fas fa-envelope"></i></button>
    <button v-show="!mail.isRead" @click="toggleRead"><i class="fas fa-envelope-open"></i></button>
    <!-- TO DO Merg with Note -->
    <button @click="sendToNote"><i class="fab fa-telegram-plane"></i></button>
    <button @click="deleteMail">delete</button>
        </div>
        <div class="mail-details-body">
            <p>{{mail.info.txt}}</p>
        </div>
        <div class="mail-details-body-vid">
          
          <iframe v-if="mail.info.vidUrl" width="450" controls :src="mail.info.vidUrl">
        </iframe>
        </div>
        <div v-if="mail.info.imgUrl" class="mail-details-body-img">
             <img :src="mail.info.imgUrl"/>
        </div>
    </section>
    `,
  data() {
    return {
      mail: null,
      isLabeled: false,
    }
  },
  created() {},
  methods: {
    sendToNote() {},
    starMail() {
      this.mail.isStared = !this.mail.isStared
    },
    deleteMail() {
      mailService
        .removeMail(this.mail)
        .then((res) => {
          if (res) {
            this.sendUserMsg('Mail moved to trash','success')
          } else {
            this.sendUserMsg("Mail removed Successfully",'success')
          }
        })
        .catch((err) => {
            this.sendUserMsg("Error , Couldn't remove",'success')
         
        })
        .then(this.$router.push('/mail'))
    },
    toggleRead() {
      this.mail.isRead = !this.mail.isRead
      mailService.put(this.mail) 
    },
    sendUserMsg(txt,type){
        const msg ={
            txt,
            type
        }
        eventBus.$emit('showMsg', msg)
    }
  },
  computed: {
    whenSent() {
      let date = new Date(this.mail.sentAt)
      return date.toUTCString()
    },
  },

  watch: {
    '$route.params.mailId': {
      handler() {
        if (this.$route.params.mailId === ':mailId') return
        const { mailId } = this.$route.params
        mailService.getById(mailId).then((mail) => {
          if (!mail.isRead) eventBus.$emit('unreadChange', -1)
          mail.isRead = true
          this.mail = mail
          this.isLabeled = mail.labels.length > 0 ? true : false
          mailService.put(this.mail)
        })
      },
      immediate: true,
    },
  },
}

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

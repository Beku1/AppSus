import { mailService } from '../services/mail-service.cmp.js'
import { eventBus } from '../../../services/event-bus-service.js'
import mailFolderList from '../cmps/mail-folder-list.cmp.js'


export default {
  components: {
    mailFolderList,
  },
  template: `
    
    <section class="mail-details" v-if="mail">
   
        <div>
        <mail-folder-list :mail="mail"/>
        </div>
        <div class="mail-details-header" >
    <h3>{{mail.title}} </h3>
   
    <div>
    <label v-show="isLabeled" v-for="label in mail.info.labels"> {{label}}</label>
</div></div>
 <div class="mail-details-info">
     <div class="mail-details-from-to">
   <span > From: {{mail.from}}</span><span>To: {{mail.to}}</span>
 </div>
    <p> {{whenSent}} </p>
    <button title="Star this mail" @click="starMail" ><i class="fas fa-star" v-bind:class="fullStar"></i></i></i></button>
    <!-- TO DO REPLY -->
    
    <!-- <button><i class="fas fa-reply"></i></button>   -->
    <button title="Make it read" v-show="mail.isRead" @click="toggleRead"><i class="fas fa-envelope"></i></button>
    <button title="Make it unread" v-show="!mail.isRead" @click="toggleRead"><i class="fas fa-envelope-open"></i></button>
    <!-- TO DO Merg with Note -->
    <button @click="sendToNote"><i class="fab fa-telegram-plane"></i></button>
    <button @click="deleteMail"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="mail-details-body">
            <p>{{mail.info.txt}}</p>
        </div>
        <div class="mail-details-body-vid">
          
          <iframe v-if="mail.info.vidUrl" width="450" height="450" controls :src="mail.info.vidUrl" allowfullscreen>
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
    sendToNote() {
        
        let type = null
        let title = ''
        let content = ''
       
        
        if(this.mail.info.txt)  {
            type = 'note-txt'
            content = this.mail.info.txt
        }
        if(this.mail.info.imgUrl)
        {
            type = 'note-img'
            content = this.mail.info.imgUrl
        } 
        //When vids added
        // if(this.mail.info.vidUrl) {
        //     type = 'note-vid' 
        //     content = this.mail.info.vidUrl
        // } 
    
        if(this.mail.title) title = this.mail.title
        let query = `new/?type=${type}&content=${content}&title=${title}`
        this.$router.push({ name: 'note', query:{type,content,title}})

    },
    starMail() {
      this.mail.isStared = !this.mail.isStared
     
      mailService.put(this.mail)
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
    fullStar(){
        
        return {full : this.mail.isStared}
    }
  },

  watch: {
    '$route.params.mailId': {
      handler() {
          
        if (this.$route.params.mailId === ':mailId') return
       if(this.$route.params.mailId === 'compose') return
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

import { mailService } from '../services/mail-service.cmp.js'
import { eventBus } from '../../../services/event-bus-service.js'

export default {
  template: `
    <section  class="mail-compose-main">
    
        <div  class="mail-compose-modal"> 
            <div class="mail-compose-modal-header">
                <button class="mail-compose-btn" title="Close compose" @click="closeModal"> X </button>
            </div>
            <input class="compose-input" @change="validateMail" v-model="mail.to" placeholder="To" />
            <input class="compose-input" v-model="mail.title" placeholder="Subject"/>
            <textarea class="compose-input" v-model="mail.info.txt" placeholder="Write your email here"></textarea>
        
            
        </div>
        <div class="mail-compose-toolbar">
            <div class="mail-compose-toolbar-input">
            <input class="mail-compose-input" type="url"  v-model="mail.info.imgUrl" v-if="imgInput" placeholder="Put your image URL here"/>
            <input class="mail-compose-input" type="url" v-model="mail.info.vidUrl" v-if="vidInput"    placeholder="Put your video URL here"/>
            
            </div>
            <div class="mail-compose-toolbar-btns">
              
              <button class="compose-mail-btn" title="Add image URL"  @click="addContent('img')"><i class="fas fa-image"></i></button>
              <button class="compose-mail-btn" title="Send mail" @click="send">Send</button>
              <button class="compose-mail-btn" title="Add video URL" @click="addContent('vid')"><i class="fab fa-youtube"></i></button>
            </div>
        </div>
</section>
    `,
  data() {
    return {
        isFromNote:null,
      imgInput: null,
      vidInput: null,
      isLabel: null,
      labelInput: null,
      mail: null,
      interval: null,
      re: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    }
  },
  created() {
    this.imgInput = false
    this.vidInput = false
    this.labelInput = false
    eventBus.$emit('modelOpen',true)
    this.getNewMail()
      this.interval = setInterval(()=>{
       mailService.put(this.mail)
      },5000)
  },
  destroyed() {
      clearInterval(this.interval)
    eventBus.$emit("modelOpen", false);
  },
  methods: {
    closeModal() {
      this.$emit('close')
      if(this.isFromNote) this.$router.push('/mail')
     
    },
    getNewMail() {
      this.mail = mailService.createNewMail()
    },
    addContent(content) {
      if (content === 'img') {
        this.imgInput = !this.imgInput
        this.vidInput = false
      }
      if (content === 'vid') {
        this.imgInput = false
        this.vidInput = !this.vidInput
      }
    },
   
    makeDraft(){
        mailService.put(this.mail)
    },
    

    send() {
      this.checkMailInfo()
      this.mail.status = 'sent'
      this.mail.isRead = false //change able to make it not apear as new mail 
      let checkPromise = new Promise((resolve, reject) => {
        let result = this.re.test(this.mail.to)
        if (result === true) resolve(result)
        else reject(err)
      })
        .then((res) => {
        
          const msg = {
            txt: 'Mail Sent',
            type: 'success',
          }
          eventBus.$emit('showMsg', msg)
          this.closeModal()
          return mailService.putFirst(this.mail)
        })
        .then((res)=>{
          eventBus.$emit('getMails')
        //   if(this.isFromNote) this.$router.push('/mail')
          
        })
        .catch(() => {
          const msg = {
            txt: 'Invalid mail address',
            type: 'error',
          }
          eventBus.$emit('showMsg', msg)
        })
    },

    checkMailInfo() {
      if (!this.mail.title || /^\s+$/.test(this.mail.title))
        this.mail.title = 'No Title'
      if (!this.mail.info.txt || /^\s+$/.test(this.mail.info.txt))
        this.mail.info.txt = 'No msg'
      this.mail.sentAt = Date.now()
    },
    validateMail() {
      let reTest = new Promise((resolve, reject) => {
        let result = this.re.test(this.mail.to)
        if (result === true) resolve(result)
        else reject(err)
      })
        .then((res) => {
         
          const msg = {
            txt: 'Mail is valid',
            type: 'success',
          }
          eventBus.$emit('showMsg', msg)
        })
        .catch(() => {
         
          const msg = {
            txt: 'Invalid mail address',
            type: 'error',
          }
          eventBus.$emit('showMsg', msg)
        })
    },
    // updateDraftMail(){
    //     mailService
    // }
  },
  computed: {},
  watch: {
    '$route.params': {
      handler() {
            if(!this.$route.query.type)  {
                return
            }     
           let query = this.$route.query
           let type = query.type
           query = mailService.queryStringify(query)
           this.isFromNote = true
         
           this.$nextTick(()=>{
               if(query.title) this.mail.title = query.title
                if(query.content && query.type === 'txt') this.mail.info.txt = query.content
                if(query.content && query.type === 'img') this.mail.info.imgUrl = query.content
                if(query.content && query.type === 'vid') this.mail.info.vidUrl = query.content
                if(query.content && query.type === 'todos') {
                    this.mail.info.txt = query.content
                }
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
//       labels: ["important", "romantic"],
//     },
//     isRead: false,
//     isStared: false,
//     sentAt: 1551133930594,
//     to: "you@are.amazaing.com",
//     from:"user@appsus.com",
//     status: "inbox || sent || trash || draft",
//    },

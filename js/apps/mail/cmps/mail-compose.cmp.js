import { mailService } from '../services/mail-service.cmp.js'
import { eventBus } from '../../../services/event-bus-service.js'

export default {
  template: `
    <section  class="mail-compose-main">
    
        <div  class="mail-compose-modal"> 
            <div class="mail-compose-modal-header">
                <button @click="closeModal"> X </button>
            </div>
            <input @change="validateMail" v-model="mail.to" placeholder="To" />
            <input v-model="mail.title" placeholder="Subject"/>
            <textarea placeholder="Write your email here"></textarea>
        
            
        </div>
        <div class="mail-compose-toolbar">
            <div class="mail-compose-toolbar-input">
            <input type="url"  v-model="mail.info.imgUrl" v-if="imgInput" placeholder="Put your image URL here"/>
            <input type="url" v-model="mail.info.vidUrl" v-if="vidInput"    placeholder="Put your video URL here"/>
            
            </div>
            <button @click="send">Send</button>
            <button @click="addContent('img')"><i class="fas fa-image"></i></button>
            <button @click="addContent('vid')"><i class="fab fa-youtube"></i></button>
            <button @click="showLabel">Labels</button>
           
        </div>
</section>
    `,
  data() {
    return {
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
    this.getNewMail()
      this.interval = setInterval(()=>{
       
      },5000)
  },
  destroyed() {},
  methods: {
    closeModal() {
      this.$emit('close')
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
    showLabel() {
      this.labelInput = !this.labelInput
      var a = /^\s+$/.test(this.mail.title)
      console.log(a)
    },
    makeDraft(){
        mailService.put(this.mail)
    },

    send() {
      this.checkMailInfo()
      this.mail.status = 'sent'
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
          return mailService.put(this.mail)
        })
        .then((res)=>{
          eventBus.$emit('getMails')
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
          console.log(res)
          const msg = {
            txt: 'Mail is valid',
            type: 'success',
          }
          eventBus.$emit('showMsg', msg)
        })
        .catch(() => {
          console.log('wrong')
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

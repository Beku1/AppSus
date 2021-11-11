import { mailService } from "../services/mail-service.cmp.js"


export default {
    
    template:`
    <section  class="mail-compose-main">
    
        <div  class="mail-compose-modal"> 
            <div class="mail-compose-modal-header">
                <button @click="closeModal"> X </button>
            </div>
            <input v-model="mail.to" placeholder="To" />
            <input v-model="mail.title" placeholder="Subject"/>
            <textarea placeholder="Write your email here"></textarea>
        
            
        </div>
        <div class="mail-compose-toolbar">
            <div class="mail-compose-toolbar-input">
            <input type="url"  v-if="imgInput" placeholder="Put your image URL here"/>
            <input type="url" v-if="vidInput"    placeholder="Put your video URL here"/>
            
            </div>
            <button @click="send">Send</button>
            <button @click="addContent('img')"><i class="fas fa-image"></i></button>
            <button @click="addContent('vid')"><i class="fab fa-youtube"></i></button>
            <button @click="showLabel">Labels</button>
        </div>
</section>
    `,
    data(){
     return {
      imgInput:null,
      vidInput:null,
      isLabel:null,
      labelInput:null,
      mail:null,
      interval:null,
     }
    },
    created(){
          this.imgInput = false
          this.vidInput = false
          this.labelInput = false
          this.getNewMail()
        //   this.interval = setInterval(()=>{

        //   },5000)
    },
    destroyed(){

    },
    methods:{
        closeModal(){
        this.$emit('close')
        },
        getNewMail(){
            this.mail = mailService.createNewMail()
        },
        addContent(content){
        if(content === 'img'){
            this.imgInput = !this.imgInput  
            this.vidInput = false
        }
        if(content === 'vid'){
            this.imgInput = false 
            this.vidInput = !this.vidInput
        }
               
        },
        showLabel(){
           this.labelInput = !this.labelInput
        },
        send(){
            if(this.mail)
            mailService.putDraft(this.mail)
        },

        checkMailInfo(){
            if(!this.mail.title || this.mail.title !== ' ') this.mail.title = 'No Title'
        }
        // updateDraftMail(){
        //     mailService
        // }

    },
    computed:{

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
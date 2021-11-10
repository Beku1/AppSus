import { mailService } from "../services/mail-service.cmp.js"


export default {
    template:`
    <section class="mail-details" v-if="mail">
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
    <button @click="deleteMail">delete</button>
        </div>
        <div class="mail-details-body">
            <p>{{mail.info.txt}}</p>
        </div>
        <div class="mail-details-body-vid">
          <video width="450" :src="mail.info.vidUrl">
              
          </video>
        </div>
        <div v-if="mail.info.imgUrl" class="mail-details-body-img">
             <img :src="mail.info.imgUrl"/>
        </div>
    </section>
    `,
    data(){
        return{
            mail:null,
            isLabeled:false,
        }
    },
    created(){

    },
    methods:{
      starMail(){
          this.mail.isStared = !this.mail.isStared
         
      },
      deleteMail(){
        mailService.removeMail(this.mail)
        this.$router.push('/mail')
      }
    },
    computed:{
     whenSent(){
         let date = new Date(this.mail.sentAt)
         return date.toUTCString()
     }
    },
   
  
    watch:{
        '$route.params.mailId':{
            handler(){
                const { mailId } = this.$route.params
                mailService.getById(mailId)
                .then(mail => {
                    this.mail = mail
                    this.isLabeled = mail.info.labels.length > 0 ? true : false       
                })
            },
            immediate:true
        }
    }
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
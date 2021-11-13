// just tamplate with btns with routes
import mailCompose from "./mail-compose.cmp.js"
import { eventBus } from "../../../services/event-bus-service.js"

export default {
    props:['mail'],
    components:{
     mailCompose
    },
    template:`
    <nav class="mail-folder-list-main">
     
        <mail-compose v-if="isCompose"  @close="closeModal"/>
        <button title="Compose Mail" class="compose-button" @click="openCompose">Compose</button>
        

      <button title="Filter by Inbox" class="inbox" @click="setFolder('inbox')"><i class="fas fa-inbox"></i></button>

      <button title="Filter by Starred mails" class="starred" @click="setFolder('star')"><i class="fas fa-star"></i></button>

       <button title="Filter by Sent" class="sent" @click="setFolder('sent')"><i class="fas fa-chevron-circle-right"></i></i></button>

      <button  title="Filter by Draft" class="draft" @click="setFolder('draft')"><i class="fas fa-sticky-note"></i></button>

      <button title="Filter by Trash" class="trash" @click="setFolder('trash')"><i class="fas fa-trash-alt"></i></button>

     
    </nav>
    `,
    data(){
   return {
       isBackable:null,
       mailId:null,
       isCompose:false
       
   }
    },
    created(){
     if(this.mail){
     this.isBackable = true
     this.mailId = this.mail.id
     }
    },
    methods:{
    openCompose(){
       this.isCompose = true
  
    },
    setFolder(type){
        this.$emit('foldered',type)
        if(this.isBackable) this.pushToList()
    },
    pushToList(){
        this.$router.push('/mail')
    },
    closeModal(){
        this.isCompose = false
    }
    

    }
}
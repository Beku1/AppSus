// just tamplate with btns with routes
import mailCompose from "./mail-compose.cmp.js"

export default {
    props:['mail'],
    components:{
     mailCompose
    },
    template:`
    <nav class="mail-folder-list-main">
     
        <mail-compose v-if="isCompose" @close="closeModal"/>
        <button class="compose-button" @click="openCompose">Compose</button>
        

      <button class="inbox" @click="setInbox"><i class="fas fa-inbox"></i></button>

      <button class="starred" @click="setStarred"><i class="fas fa-star"></i></button>

       <button class="sent" @click="setSent"><i class="fas fa-chevron-circle-right"></i></i></button>

      <button class="draft" @click="setDraft"><i class="fas fa-sticky-note"></i></button>

     
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
    setInbox(){
    
        if(this.isBackable)this.pushToList()
    },
    setStarred(){

        if(this.isBackable)this.pushToList()
    },
    setSent(){

        if(this.isBackable)this.pushToList()
    },
    setDraft(){

        if(this.isBackable)this.pushToList()
    },
    pushToList(){
        this.$router.push('/mail')
    },
    closeModal(){
        this.isCompose = false
    }
    

    }
}
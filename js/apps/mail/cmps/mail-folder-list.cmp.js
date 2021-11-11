// just tamplate with btns with routes
import mailCompose from "./mail-compose.cmp.js"

export default {
    props:['isDetails'],
    components:{
     mailCompose
    },
    template:`
    <nav class="mail-folder-list-main">
        
      <button class="compose-button" @click="compose">Compose</button>

      <button class="inbox" @click="setInbox"><i class="fas fa-inbox"></i></button>

      <button class="starred" @click="setStarred"><i class="fas fa-star"></i></button>

       <button class="sent" @click="setSent"><i class="fas fa-chevron-circle-right"></i></i></button>

      <button class="draft" @click="setDraft"><i class="fas fa-sticky-note"></i></button>

     
    </nav>
    `,
    data(){
   return {
       isBackable:null
   }
    },
    created(){
     if(this.isDetails)
     this.isBackable = true
    },
    methods:{
    compose(){
    
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
    }
    

    }
}
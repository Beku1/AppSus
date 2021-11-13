import { mailService } from "../services/mail-service.cmp.js"
import { eventBus } from "../../../services/event-bus-service.js"


export default {
    props:['mail'],

template:`

<div class="mail-preview-toolbar">
<button @click.prevent="deleteMail" class="no-border-icons"><i class="fas fa-trash-alt "></i></button>
<button title="Make it read" v-show="mail.isRead" @click.prevent="toggleRead" class="no-border-icons"><i class="fas fa-envelope "></i></button>
    <button title="Make it unread" v-show="!mail.isRead" @click.prevent="toggleRead" class="no-border-icons"><i class="fas fa-envelope-open "></i></button>

</div>

`,
data(){
    return{
    
    }
},
methods:{
    deleteMail() {
        mailService
          .removeMail(this.mail)
          .then((res) => {
            if (res) {
              this.sendUserMsg('Mail moved to trash','success')
            } else {
              this.sendUserMsg("Mail removed Successfully",'success')
            }
            this.$emit('getMails')
          })
          .catch((err) => {
              this.sendUserMsg("Error , Couldn't remove",'success')
           
          })
          
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
}
}
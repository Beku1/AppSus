import mailPreview from './mail-preview.cmp.js'
import { eventBus } from '../../../services/event-bus-service.js'


export default {
    props:['mails'],
    components:{
        mailPreview
    },
    template:`
     <section class="mail-list-main">
         <div v-for="mail in mails" :key="mail.id" class="mail-preview">
         <router-link  :to="'/mail/details/'+mail.id"><mail-preview :mail="mail"/></router-link>
        </div>
     </section>
    `,
    data(){
        return{
          sortBy:{
            type:'date',
            isBackwards:false
          }
        }
    },
    created(){
        // eventBus.$on('sortBy',this.mailSortBy)
    },
    destroyed(){
        // eventBus.$off('sortBy')
    },
    methods:{
     mailsortBy(sortBy){
     this.sortBy = sortBy
     },
     starMail() {
        this.mail.isStared = !this.mail.isStared
       
        mailService.put(this.mail)
      },
    },
    computed:{

    }
}
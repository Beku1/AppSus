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
         <router-link  :to="'/mail/'+mail.id"><mail-preview :mail="mail"/></router-link>
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
        eventBus.$on('sortBy',this.mailSortBy)
    },
    destroyed(){
        eventBus.$off('sortBy')
    },
    methods:{
     mailsortBy(sortBy){
     this.sortBy = sortBy
     }
    },
    computed:{
//         setSort(){
//             let order =this.sortBy.isBackwards ? 1 : -1
//             let sorted
//             if(this.sortBy.type === 'title') {
//                sorted = this.mails.sort((a,b)=>{
//                     let results = a.title > b.title ? -1 : a.title < b.title ? 1: 0
//                     return results*order
//                 })
//             }
//             else {
//                 sorted = this.mails.sort((a,b)=>{
//                   let results = a.sentAt > b.sentAt ? -1 : a.sentAt < b.sentAt ? 1 : 0
//                     return results * order
//                 })
//             }
//             return sorted
            
  
//         },
//     },
// }
    }
}
import mailPreview from './mail-preview.cmp.js'


export default {
    props:['mails'],
    components:{
        mailPreview
    },
    template:`
     <section class="mail-list-main">
         <div v-for="mail in mails" :key="mail.id" class="mail-preview">
         <router-link :to="'/mail/'+mail.id"><mail-preview :mail="mail"/></router-link>
        </div>
     </section>
    `,
    data(){
        return{
       
        }
    },
    created(){
     
    },
    methods:{
    
    },
    computed:{

    },
}
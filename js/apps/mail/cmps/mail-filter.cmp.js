// including sort

import { utilService } from "../../../services/utils-service.js"
import { mailService } from "../services/mail-service.cmp.js"
import { eventBus } from "../../../services/event-bus-service.js"

export default {
    template:`
    <section class="mail-filter-main">
        <div class="mail-filter-main-search-nav"><i class="fas fa-search" @click="filter" @keyup.enter="filter"></i>
        
      <input v-model="filterBy.txt" @change="filter" spellcheck="false" type="search"  />
      
        <div class="filter-read-container">

            <select @change="filter" class="mail-select" v-model="filterBy.read">
            <option value="">All</option>
            <option value=true>Read</i></option>
            <option value=false>Unread</option>
        </select>

         <i class="fas fa-sort-amount-down-alt select-icon"></i>

        
</div>
        

    
</div>
<div class="sorting">
          <button @click="sortMails('title')">Sort by title</button>
          <button @click="sortMails('date')">Sort by date</button>
         </div>
    </section>
    `,
    data(){
     return {
     filterBy:{
         read:'',
         txt:null,
         folder:'inbox'
         
     },
     sortBy:{
         type:'date',
         isBackwards:false
     },
     isSortDateBackwards:true,
     isSortTitleBakwards:true
     }
    },
    created(){
    
    },
    destroyed(){

    },
    methods:{
     filter(){
         if(this.filterBy.read === 'true') this.filterBy.read = true
        if(this.filterBy.read === 'false') this.filterBy.read = false

         this.$emit('filtered',{...this.filterBy})
     },
     sortMails(type){
         this.sortBy.type = type
         if(type === 'title') {
            this.sortBy.isBackwards = this.isSortTitleBakwards
             this.isSortTitleBakwards = !this.isSortTitleBakwards
         }
         else {
            
            this.sortBy.isBackwards = this.isSortDateBackwards
            this.isSortDateBackwards = !this.isSortDateBackwards
         } 
        
         this.$emit('sorted',this.sortBy)
        
     }
    },
    computed:{

    }
}
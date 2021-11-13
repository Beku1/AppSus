import { router } from "../routes.js";
import { eventBus } from '../services/event-bus-service.js'
import { basicStorageService } from "../services/storage-service.js";


export default {
    template: `
      <header class="app-header-main">
        <nav class="app-header-nav">
          <div class="app-header-logo">          
            <router-link to="/"><img class="logo-img" src="./../img/logo.png"/></router-link>
          </div>    
          <div class="app-header-links">      
              <router-link to="/book"><i class="fas fa-book"></i></router-link> 
              <router-link to="/note"><i class="fas fa-sticky-note special"></i></i></router-link>
              <router-link to="/mail"><div class="app-header-mail"><i class="fas fa-envelope special"></i><span class="mail-unread">{{unreadCount}}</span></div></router-link>
          </div>   
          <div class="app-header-about">   
            <router-link to="/about"><i class="fas fa-address-card"></i></router-link>
          </div>   
              </nav>

      </header>
      `,
      data(){
        return{
          img:'..',
          unreadCount:null
        }
      },
    created() {
    basicStorageService.getUnreadCount()
     .then((count)=>{
       this.getUnread(count)
     })
       eventBus.$on('unreadCount',this.getUnread)
       eventBus.$on('unreadChange',this.unreadChange)
    },
    destroyed(){
     eventBus.$off('unreadCount')
     eventBus.$off('unreadChange')
    },
    methods:{
      getUnread(unreadCount){
        this.unreadCount = unreadCount 
      },
      unreadChange(count){
        this.unreadCount += count
      }
      
    }
    
  };
  
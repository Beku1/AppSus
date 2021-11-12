import { router } from "../routes.js";
import { eventBus } from '../services/event-bus-service.js'


export default {
    template: `
      <header class="app-header-main">
        <nav class="app-header-nav">
          <div class="app-header-logo">          
            <router-link to="/">Logo</router-link> |
          </div>    
          <div class="app-header-links">      
              <router-link to="/books">Books</router-link> 
              <router-link to="/note">Note</router-link>
              <router-link to="/mail">Mail<span>{{unreadCount}}</span></router-link>
          </div>   
          <div class="app-header-about">   
            <router-link to="/about">About</router-link>
          </div>   
              </nav>

      </header>
      `,
      data(){
        return{
          unreadCount:null
        }
      },
    created() {
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
  
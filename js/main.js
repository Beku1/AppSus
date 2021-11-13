// import noteApp from "./apps/note/pages/note-app.cmp.js";
import appHeader from "./cmps/app-header.cmp.js";
import appFooter from "./cmps/app-footer.cmp.js";
import { router } from "./routes.js";
import { eventBus } from "./services/event-bus-service.js";

const options = {
  el: "#app",
  router,
  components: {
    appHeader,
    appFooter
    
  },
  template: `
    <section class="main">
    <div :class="{screen: isOpen}"></div>

        <app-header></app-header>
        <router-view></router-view>
        <!-- <app-footer></app-footer> -->

      </section>
    `,
    data(){
      return{

        isOpen:false
      }
    },
    created(){
      eventBus.$on('modelOpen',this.isModalOpen)
    },
    methods:{
      isModalOpen(isOpen){
        this.isOpen = isOpen
      }
    }
};


new Vue(options);

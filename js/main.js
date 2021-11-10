// import noteApp from "./apps/note/pages/note-app.cmp.js";
import appHeader from "./cmps/app-header.cmp.js";
import appFooter from "./cmps/app-footer.cmp.js";
import { router } from "./routes.js";

const options = {
  el: "#app",
  router,
  components: {
    appHeader,
    appFooter
    
  },
  template: `
    <section class="main">
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
    </section>
    `,
};

new Vue(options);

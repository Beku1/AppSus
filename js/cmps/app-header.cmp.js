import { router } from "../routes.js";


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
              <router-link to="/mail">Mail</router-link>
          </div>   
          <div class="app-header-about">   
            <router-link to="/about">About</router-link>
          </div>   
              </nav>

      </header>
      `,
    created() {},
  };
  
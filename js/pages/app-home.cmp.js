export default {
  template: `
             <section class="home-page">
            <div class="home-page-hero">
            
 <h1>Welcome To </h1><span> <img class="icon-home-page" src="./../../img/icon.png"/></span>
              <p>One place For anything you need</p>
              <router-link :to="{path:'mail/compose/',query:{type:'txt',content:'yabadabadu',title:'aha'}}">CLICK ME</router-link>
            </div>
        </section>
      `,
};


// path:'compose/:txt?:imgUrl?:vidUrl?:todo?:title?'
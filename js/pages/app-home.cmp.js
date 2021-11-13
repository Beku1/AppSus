export default {
  template: `
             <section class="home-page">
            <div class="home-page-hero">
              <h1>Welcome To Appsus</h1>
              <router-link :to="{path:'mail/compose/',query:{type:'txt',content:'yabadabadu',title:'aha'}}">CLICK ME</router-link>
            </div>
        </section>
      `,
};


// path:'compose/:txt?:imgUrl?:vidUrl?:todo?:title?'
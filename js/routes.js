import appHome from './pages/app-home.cmp.js'
import appAbout from './pages/app-about.cmp.js'
import mailApp from './apps/mail/pages/mail-app.cmp.js'
import mailDetails from './apps/mail/pages/mail-details.cmp.js'
import noteAppCmp from './apps/note/pages/note-app.cmp.js'
import mailCompose from './apps/mail/cmps/mail-compose.cmp.js'
import bookApp from './apps/book/pages/book-app.cmp.js'
import bookDetails from './apps/book/pages/book-details.cmp.js'



const routes = [
  {
    path: '/',
    component: appHome,
  },
  {
    path: '/about',
    component: appAbout,
  },
  {
    path: '/mail',
    component: mailApp,
    children:[
      {
        path:'compose/:type?:content?:title?',
        // path:'compose/:objStr?',
        component:mailCompose
      }
    ]
  
  },
  {
    path: '/mail/details/:mailId?',
    component: mailDetails,
    
  },
  {
    path: '/note',
    name:'note',
    component: noteAppCmp,
    children:[
      {
        path:'new/:type?:content?:title?',
       
      }
      
    ],
    
  },
  {
    path:'/book',
    component:bookApp
},
{
    path:'/book/:bookId',
    component:bookDetails
}
  // {
  //     path: '/books',
  //     component: bookApp
  // },
  // {
  //     path: '/books/:bookId?',
  //     component: bookDetials
  // },
  // {
  //     path: '/books/:bookId?',
  //     component: bookDetials
  // },
]

export const router = new VueRouter({ routes })

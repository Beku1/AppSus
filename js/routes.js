import appHome from './pages/app-home.cmp.js'
import appAbout from './pages/app-about.cmp.js'
import mailApp from './apps/mail/pages/mail-app.cmp.js'
import mailDetails from './apps/mail/pages/mail-details.cmp.js'
import noteAppCmp from './apps/note/pages/note-app.cmp.js'

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
    path: '/mail:compose?:mailid?',
    component: mailApp,
  },
  {
    path: '/mail/:mailId?:compose?:new?',
    component: mailDetails,
  },
  {
    path: '/note',
    component: noteAppCmp,
  },
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

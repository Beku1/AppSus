import appHome from "./pages/app-home.cmp.js";
import appAbout from "./pages/app-about.cmp.js";


const routes = [
  {
      path: '/',
      component: appHome
  },
  {
      path: '/about',
      component: appAbout
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
];

export const router = new VueRouter({ routes });

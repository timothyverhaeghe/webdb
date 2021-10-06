import Vue from 'vue'
import Router from 'vue-router'


import Login from '@/pages/auth/login.vue'
import TokenValidation from '@/pages/auth/tokenValidation.vue'
import Token from '@/pages/auth/token.vue'


import Projects from '@/pages/projects/overview.vue'
import ProjectSettings from '@/pages/projects/settings.vue'
import ProjectNew from '@/pages/projects/new.vue'


import Collections from '@/pages/collections/index.vue'
import Collection from '@/pages/collections/detail.vue'
import CollectionDocs from '@/pages/collections/docs.vue'


import Account from '@/pages/account/settings.vue'


Vue.use(Router);

window.routes = [


  //{ path: '/', name: 'Homepage', component: Homepage },
  { path: '/', redirect: '/collections' },

  { path: '/login', name: 'login', component: Login },
  { path: '/token', name: 'token', component: Token },
  { path: '/token/:token', name: 'magic-link', component: TokenValidation },

  { path: '/projects', name: 'projects', component: Projects },
  { path: '/projects/new', name: 'new-project', component: ProjectNew },
  { path: '/settings', name: 'project', component: ProjectSettings },

  { path: '/collections', name: 'collections', component: Collections },
  { path: '/collections/:id', name: 'collection', component: Collection },
  { path: '/collections/:id/docs', name: 'collectiondocs', component: CollectionDocs },

  { path: '/account', name: 'account', component: Account },


]

const router = new Router({
  mode: 'history',
  scrollBehavior() {
   return { x: 0, y: 0 }; // open another page => go to top!
  },
  routes: window.routes
})

export default router

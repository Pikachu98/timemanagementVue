import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Friend from '@/components/Friend'
import Store from '@/components/Store'
import Timer from '@/components/Timer'
import Record from '@/components/Record'
import Tag from '@/components/Tag'
import TagEdit from '@/components/TagEdit'
import MyTrees from '@/components/MyTrees'

import Login from '@/components/Login'
import LoginMessage from '@/components/LoginMessage'
import Logout from '@/components/Logout'
import auth from '@/auth'
import AboutUs from '@/components/AboutUs'
import ContactUs from '@/components/ContactUs'
import TagCreate from '@/components/TagCreate'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/friends',
      name: 'Friend',
      component: Friend,
      meta: { requireAuth: true }
    },
    {
      path: '/store',
      name: 'Store',
      component: Store,
      meta: { requireAuth: true }
    },
    {
      path: '/mytrees',
      name: 'MyTrees',
      component: MyTrees,
      meta: { requireAuth: true }
    },
    {
      path: '/timer',
      name: 'Timer',
      component: Timer,
      meta: { requireAuth: true }
    },
    {
      path: '/tag',
      name: 'Tag',
      component: Tag,
      meta: { requireAuth: true }
    },
    {
      path: '/record',
      name: 'Record',
      component: Record,
      meta: { requireAuth: true }
    },
    {
      path: '/about',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/contact',
      name: 'ContactUs',
      component: ContactUs
    },
    {
      path: '/tagEdit',
      name: 'TagEdit',
      component: TagEdit,
      meta: { requireAuth: true },
      props: true
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { guestOnly: true }
    },
    {
      path: '/loginmessage',
      name: 'LoginMessage',
      component: LoginMessage,
      meta: { requireAuth: true }
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
      meta: { requireAuth: true }
    },
    {
      path: '/createtag',
      name: 'Create Tag',
      component: TagCreate
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = auth.user()
  let requireAuth = to.matched.some(record => record.meta.requireAuth)
  let guestOnly = to.matched.some(record => record.meta.guestOnly)

  if (requireAuth && !currentUser) next('login')
  else if (guestOnly && currentUser) next('loginmessage')
  else next()
})

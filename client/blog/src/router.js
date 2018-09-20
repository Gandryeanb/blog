import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'
import register from './views/register.vue'
import cards from './components/content/cards.vue'
import cardView from './components/content/cardView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children:
      [{
        path: '/list',
        name: 'cards',
        props: true,
        component: cards
      },
      {
        path: '/list/article/:id',
        name: 'cardView',
        props: true,
        component: cardView
      }]
    },
    {
      path: '/register',
      name: 'register',
      component: register
    }
  ]
})

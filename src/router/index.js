import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/recherche/:ville',
      name: 'recherche',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Recherche.vue'),
    },
    {
      path: '/connection',
      name: 'connection',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ConnectPage.vue'),
    },
    
    {
      path: '/createComptePro',
      name: 'createComptePro',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreationDeCompte/CreaComptePro.vue'),
    },
    {
      path: '/createCompteProSuite',
      name: 'createCompteProSuite',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreationDeCompte/CreaCompteProSuite.vue'),
    },
    {
      path: '/CreationAccountParticular',
      name: 'CreationAccountParticular',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreationDeCompte/CreationAccountParticular.vue'),
    },
    {
      path: '/ShowAnnonce/:id',
      name: 'ShowAnnonce',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Annonce/ShowAnnonce.vue'),
    },
    
    {
      path: '/annonces/deposer',
      name: "deposerAnnonce",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Annonce/DeposerAnnonce.vue'),
    },
    {
      path: '/account/private/home',
      name: 'accountHome',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MyAccount.vue'),
    },
    {
      path: '/messages',
      name: 'messages',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Messagerie/Messagerie.vue'),
    },
    {
      path: '/reservation-annonce/:id',
      name: 'reservation-annonce',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Annonce/ReservationAnnonce.vue'),
    },
    {
      path: '/panneau-finalisation-paiement/:id',
      name: 'panneau-finalisation-paiement',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Annonce/FinaliserPayement.vue'),
    },
    
  ],
})

export default router

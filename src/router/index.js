import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useAuthStore} from "@/stores/auth.js";

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
      path: '/connexion',
      name: 'connexion',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ConnectPage.vue'),
    },
    {
      path: '/connection',
      redirect: {name: 'connexion'}
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
      meta: {requiresAuth: true}
    },
    {
      path: '/messages',
      name: 'messages',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Messagerie/Messagerie.vue'),
      meta: {requiresAuth: true}
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
    {
      path: '/favoris',
      name: 'favoris',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/favoris.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: HomeView
    }
    
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if(to.meta.requiresAuth && !authStore.isConnected) {
    next({
      path: '/connexion',
      query: {redirect: to.fullPath}
    })
  } else
      next()
})

export default router

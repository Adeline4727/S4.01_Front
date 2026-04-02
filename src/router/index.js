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
      path: '/recherche/:filter',
      name: 'recherche',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Recherche.vue'),
    },
    {
      path: "/recherche/",
      name: "rechercheNormal",
      component: () => import('../views/Recherche.vue')
    },
    {
      path: '/connexion',
      name: 'connexion',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ConnectPage.vue'),
      meta: {requiresNoAuth: true},
    },
    {
      path: '/connection',
      redirect: {name: 'connexion'},
      meta: {requiresNoAuth: true},
    },
    {
      path: '/createComptePro',
      name: 'createComptePro',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreationDeCompte/CreaComptePro.vue'),
      meta: {requiresNoAuth: true},
    },
    {
      path: '/createCompteProSuite',
      name: 'createCompteProSuite',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreationDeCompte/CreaCompteProSuite.vue'),
      meta: {requiresNoAuth: true},
    },
    {
      path: '/CreationAccountParticular',
      name: 'CreationAccountParticular',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreationDeCompte/CreationAccountParticular.vue'),
      meta: {requiresNoAuth: true},
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
      meta: {requiresAuth: true}
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
      meta: {requiresAuth: true}
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
  } else if(to.meta.requiresNoAuth && authStore.isConnected) {
    next({
      path: '/account/private/home',
      query: {redirect: to.fullPath}
    })
  } else
      next()
})

export default router

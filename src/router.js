import { createRouter, createWebHistory } from "vue-router";

import Index from "./components/Index.vue";

import Login from "./components/Login.vue";

import Main from "./components/Main.vue";

const routes = [
  { 
    path: "/", component: Index },
  
   { path: "/login", name: "Login", component: Login },
  
   { path: "/main/:id", name: "main", component: Main },
  
];


const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});


export default router;

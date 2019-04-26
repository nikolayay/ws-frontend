import Vue from "vue";
import Router from "vue-router";
import { get } from "./session";
// import Dashboard from "@/views/Dashboard";
// import Login from "@/views/Login";
// import SignUp from "@/views/SignUp";
// import CreateEntry from "@/views/CreateEntry";
// import Research from "@/views/Research";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/Dashboard"),
      meta: { requiresAuth: true }
    },
    {
      path: "/research",
      name: "Research",
      component: () => import("@/views/Research"),
      meta: { requiresAuth: true }
    },
    {
      path: "/create-entry",
      component: () => import("@/views/CreateEntry"),
      meta: { requiresAuth: true }
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/SignUp")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login")
    }
  ]
});

router.afterEach(() => {
  //  finish the progress bar
  router.app.$Progress.finish();
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    router.app.$Progress.start();
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    const t = get();
    if (!t) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;

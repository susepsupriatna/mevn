import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/blogs",
      name: "blogs",
      component: () => import("../components/BlogsList")
    },
    {
      path: "/blogs/:id",
      name: "detail blog",
      component: () => import("../components/Blog")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("../components/AddBlog")
    },
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home")
    },
    {
      path: "/home",
      component: () => import("../views/Home")
    },
    {
      path: "/login",
      component: () => import("../views/Login")
    },
    {
      path: "/register",
      component: () => import("../views/Register")
    },
    {
      path: "/profile",
      name: "profile",
      // lazy-loaded
      component: () => import("../views/Profile.vue")
    },
    {
      path: "/admin",
      name: "admin",
      // lazy-loaded
      component: () => import("../views/BoardAdmin.vue")
    },
    {
      path: "/mod",
      name: "moderator",
      // lazy-loaded
      component: () => import("../views/BoardModerator.vue")
    },
    {
      path: "/user",
      name: "user",
      // lazy-loaded
      component: () => import("../views/BoardUser.vue")
    }
    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
  ]
});
// router.beforeEach((to, from, next) => {
//   const publicPages = ["/login", "/register", "/home"];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem("user");

//   if (authRequired && loggedIn) {
//     next("/login");
//   } else {
//     next();
//   }
// });

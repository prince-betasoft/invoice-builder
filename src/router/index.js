import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from "firebase";
// import Login from '@/views/Login'
import RegisterCustomer from "@/views/RegisterCustomer";
import RegisterAdmin from "@/views/RegisterAdmin";
import Admin from "@/views/Admin";
import Subscriber from "@/views/Subscriber";
import Customer from "@/views/Customer";
//  import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "add",
  //   component: () => import("../components/UserCreate"),
  // },
  // {
  //   path: "/list",
  //   name: "list",
  //   component: () => import("../components/UserList"),
  // },
  // {
  //   path: "/edit/:id",
  //   name: "edit",
  //   component: () => import("../components/UserEdit"),
  // },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      guest: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/register-customer",
    name: "regiester-customer",
    component: RegisterCustomer,
    meta: {
      guest: true,
    },
  },
  {
    path: "/register-admin",
    name: "register-admin",
    component: RegisterAdmin,
    meta: {
      guest: true,
    },
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: Login,
  //   meta: {
  //     guest: true
  //   }
  // },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/subscriber",
    name: "subscriber",
    component: Subscriber,
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/customer",
    name: "customer",
    component: Customer,
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/create-invoice",
    name: "create-invoice",
    component: () => import("../views/Invoice.vue"),
    meta: {
      guest: true,
    },
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: () => import("../views/EditInvoice"),
    meta: {
      guest: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    if (firebase.auth().currentUser) {
      next();
    } else {
      alert("You must be logged in to see this page");
      next({
        path: "/",
      });
    }
  } else {
    next();
  }
  firebase.auth().onAuthStateChanged((userAuth) => {
    if (userAuth) {
      firebase
        .auth()
        .currentUser.getIdTokenResult()
        .then(function ({ claims }) {
          if (claims.customer) {
            if (to.path !== "/customer")
              return next({
                path: "/customer",
              });
          } else if (claims.admin) {
            if (to.path !== "/admin")
              return next({
                path: "/admin",
              });
          } else if (claims.subscriber) {
            if (to.path !== "/subscriber")
              return next({
                path: "/subscriber",
              });
          }
        });
    } else {
      if (to.matched.some((record) => record.meta.auth)) {
        next({
          path: "/login",
          query: {
            redirect: to.fullPath,
          },
        });
      } else {
        next();
      }
    }
  });

  next();
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import login from "../views/login.vue";
import firebase from "firebase";
import Register from "@/views/register";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: login,
    meta: {
      guest: true,
    },
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: Register,
    meta: {
      guest: true,
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
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/dashboard.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/new-invoice",
    name: "new-invoice",
    component: () => import("../views/NewInvoiceGenerate.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/new-client",
    name: "new-client",
    component: () => import("../views/addNewClient.vue"),
    meta: {
      guest: true,
    },
  },
  {
    path: "/my-details",
    name: "my-details",
    component: () => import("../views/MyDetails.vue"),
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
      console.log("user_id", userAuth.uid);
      firebase
        .auth()
        .currentUser.getIdTokenResult()
        .then(function ({ claims }) {
          if (claims.admin) {
            if (to.path !== "/new-invoice")
              return next({
                path: "/new-invoice",
              });
          }
        });
    } else {
      if (to.matched.some((record) => record.meta.auth)) {
        next({
          path: "/",
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

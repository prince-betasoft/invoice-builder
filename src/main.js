import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";
// import "firebase/auth";
import "firebase/firestore";
// import firebase from 'firebase/app';
import "../src/assets/CustomStyle.css";

var firebaseConfig = {
  apiKey: "AIzaSyB2AM6H0gxlReWA9xNdRJbWhC-396S8keA",
  authDomain: "test-mode-b30.firebaseapp.com",
  databaseURL:
    "https://test-mode-b30-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-mode-b30",
  storageBucket: "test-mode-b30.appspot.com",
  messagingSenderId: "623784780196",
  appId: "1:623784780196:web:23d5657f4a0ac874f7a131",
  measurementId: "G-ZZ6K87BB6Z",
};

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

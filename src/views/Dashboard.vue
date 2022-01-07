<template>
  <div>
    <div class="logo">
      <h2></h2>
    </div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      class=""
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-content class="dashboard-username-wrapper">
            <v-list-item-title>
              <p v-if="user">Email: {{ user.email }}</p></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-list class="dashboard-sidebar-selectedheading-wrapper">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider style="margin-top: 35px"></v-divider>
      <v-btn class="sidebar-paymentbtn-wrapper"> International Payments </v-btn>
      <v-divider style="margin-bottom: 35px"></v-divider>
      <v-list-item>
        <v-list-item-icon class="dashboard-sidebar-logout-wrapper">
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title
            class="dashboard-sidebar-selectedheading-wrapper"
            @click="signout"
          >
            Sign Out</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon class="dashboard-sidebar-email-wrapper">
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title
            class="dashboard-sidebar-selectedheading-wrapper"
            @click="sendEmailDefault"
          >
            Contact Us</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
  </div>
</template>
<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import Toaster from "../services/sweetToaster.js";

export default {
  name: "UserDashboard",
  data() {
    return {
      users: [],
      user: null,
      email: "",
      password: "",
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "dashboard-sidebar-document-wrapper",
          title: "Invoices",
          to: "/new-invoice",
        },
        {
          icon: "dashboard-sidebar-account-wrapper",
          title: "Clients",
          to: "/new-client",
        },
        {
          icon: "dashboard-sidebar-settings-wrapper",
          title: "My Details",
          to: "/my-details",
        },
      ],

      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
      fav: true,
      menu: false,
      message: false,
      hints: true,
    };
  },
  created() {
    var self = this;
    firebase.auth().onAuthStateChanged((user) => {
      self.user = user;
    });
    this.users = [];
    firebase
      .firestore()
      .collection("roles")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          var user = doc.data();
          user.id = doc.id;
          // console.log("data", doc.data());
          if (!user.role.admin) this.users.push(user);
        });
      });
  },
  methods: {
    sendEmailDefault() {
      var email = "contact@freeinvoicebuilder.com";
      var subject = "";
      var msgBody =
        "Thank you for contacting us, we will get back to you in 24 hours!";
      window.open(`mailto:${email}?subject=${subject}&body=${msgBody}`);
    },
    signout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          Toaster.success("Successfully logged out!", "success");

          this.$router.push("/");
        })
        .catch((error) => {
          alert(error.message);
          this.$router.push("/");
        });
    },
    changeRole(uid, event) {
      var setUserRole = firebase.functions().httpsCallable("setUserRole");
      var data = { uid: uid, role: { [event.target.value]: true } };
      setUserRole(data)
        .then((result) => {
          console.log("Result", result);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    },
  },
};
</script>

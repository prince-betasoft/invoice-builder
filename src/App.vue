<template>
  <div id="app">
    <HelloWorld msg="Welcome" />
    <header class="header-area fixed_header">
      <v-card-actions class="login-btn-main-wrapper">
        <router-link to="/create-invoice"> Create Invoice</router-link>
        <!-- <router-link class="nav-link pr-3" to="/">Add User</router-link>
        <router-link class="nav-link" to="/list">View Users</router-link> -->
      </v-card-actions>
    </header>

    <div id="nav">
      <div v-if="!user" class="col-sm">
        <router-link to="/">Sign In</router-link> |
        <router-link to="/register-admin">Sign Up</router-link>
        <!-- <div v-if="user_type == 'Admin'">
          <router-link to="/admin">Dashboard</router-link>
        </div>
        <div v-if="user_type == 'Customer'">
          <router-link to="/customer">Dashboard</router-link>
        </div> -->
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import firebase from "firebase";
// import * as firebase from "firebase/app";
// import "firebase/auth";

export default {
  // name: "Home","App",
  components: {
    HelloWorld,
  },
  data() {
    return {
      email: "",
      password: "",
      user: null,
    };
  },
  created() {
    var self = this;
    firebase.auth().onAuthStateChanged(function (user) {
      self.user = user;
    });
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Successfully logged out");
          this.$router.push("/");
        })
        .catch((error) => {
          alert(error.message);
          this.$router.push("/");
        });
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
input {
  margin-right: 20px;
}
header {
  border-bottom: 1px solid #e2e2e2;
}
.login-btn-main-wrapper {
  justify-content: right;
}
.login-btn-main-wrapper button.faq-contact-submit-btn {
  width: 150px;
}
.v-card__actions.login-btn-main-wrapper a {
  color: #fff;
  font-size: 16px;
  background-color: #1e79f2;
  font-weight: 500;
  padding: 13px 20px;
  text-decoration: none;
  border-radius: 4px;
  letter-spacing: 0.5px;
}
.v-card__actions.login-btn-main-wrapper a:hover {
  text-decoration: underline;
}
</style>

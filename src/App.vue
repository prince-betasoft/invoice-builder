<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
// @ is an alias to /src
import firebase from "firebase";

export default {
  components: {},
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

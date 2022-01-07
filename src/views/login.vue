<template>
  <div>
    <v-app>
      <header class="header-area fixed_header">
        <v-card-actions class="login-btn-main-wrapper">
          <v-card-actions class="dashboard-header-logo-wrapper">
          </v-card-actions>
          <router-link to="/create-invoice"> Create Invoice</router-link>
        </v-card-actions>
      </header>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card>
              <v-toolbar color="primary" dark>
                <v-toolbar-title>Sign In</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form
                  @submit.prevent="login"
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-text-field
                    type="email"
                    label="Email Address"
                    v-model="email"
                    class="form-control"
                    :rules="emailRules"
                    required
                    hide-details="auto"
                    outlined
                  ></v-text-field>
                  <br />
                  <v-text-field
                    v-model="password"
                    type="password"
                    label="Password"
                    required
                    :rules="passwordRules"
                    class="form-control"
                    hide-details="auto"
                    outlined
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="login-btn-main-wrapper login-wrapper">
                <v-btn
                  :disabled="!valid"
                  color="primary"
                  class="faq-contact-submit-btn"
                  type="submit"
                  @click="login"
                >
                  Login<i class="fas fa-chevron-right ml-2"></i>
                </v-btn>
              </v-card-actions>
              <v-divider style="margin-top: 35px"></v-divider>

              <v-row class="alignment_wrapper">
                <div>Don't have an account?</div>
              </v-row>
              <v-btn class="download-btn">
                <router-link to="/sign-up">Sign Up</router-link>
              </v-btn>
              <!-- <div class="google">
                <div class="google-button" @click="socialLogin">
                  <h6>Or</h6> -->
              <!-- <img
                    src="http://www.androidpolice.com/wp-content/themes/ap2/ap_resize/ap_resize.php?src=http%3A%2F%2Fwww.androidpolice.com%2Fwp-content%2Fuploads%2F2015%2F10%2Fnexus2cee_Search-Thumb-150x150.png&w=150&h=150&zc=3"
                  /> -->
              <!-- <div class="google-act-btn-innerwrapper">
                    <v-btn class="account-btn-wrapper">
                      <span class="icon mdi mdi-google"></span>
                      <a class="google-word">Login with Google</a>
                    </v-btn>
                  </div>
                </div>
              </div> -->
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>
<script>
// @ is an alias to /src
import "firebase/auth";
import Toaster from "../services/sweetToaster.js";
import firebase from "firebase";

export default {
  name: "login",
  components: {},
  methods: {
    login() {
      const check = this.$refs.form.validate();
      if (check) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then((response) => {
            Toaster.success(" Successfully logged in", "success");
            var db = firebase.firestore();
            db.collection("users")
              .where("uid", "==", response.uid)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  console.log(response.uid, " => ", doc.data());
                  let user_type = doc.data().user_type;
                  if (user_type == "Individual") {
                    this.$router.push("/new-invoice");
                  } else if (user_type == "Company") {
                    this.$router.push("/new-invoice");
                  }
                });
              });
          })
          .catch(() => {
            Toaster.error(" Incorrect email or password", "error");
          });
      }
    },

    created() {
      firebase.auth().onAuthStateChanged((userAuth) => {
        if (userAuth) {
          firebase
            .auth()
            .currentUser.getIdTokenResult()
            .then((tokenResult) => {
              console.log("Token ", tokenResult.claims);
            });
        }
      });
    },
    socialLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$router.push("/new-invoice");
        })
        .catch((err) => {
          alert("Oops. " + err.message);
        });
    },
    validate() {
      this.$refs.form.validate();
    },

    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
  data: () => ({
    valid: true,
    email: "",
    password: "",

    emailRules: [
      (v) => !!v || "Please complete this mandatory field",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [
      (v) => !!v || "Please complete this mandatory field",
      (v) => (v && v.length > 5) || "Password must at least 6 characters",
    ],
  }),
};
</script>
<style scoped>
.layout.login-page-main-wrapper {
  justify-content: center;
  background-color: #f8f8f8;
}
.login-form-body-wrapper {
  padding: 50px;
}
img {
  display: block;
  width: 80px;
  margin: 30px auto;
  box-shadow: 0 5px 10px -7px #333333;
  border-radius: 50%;
}
.google-button h6 {
  font-size: 16px;
  font-weight: 500;
  margin: 10 px 0 px 0 px 0 px;
}
button.account-btn-wrapper {
  background-color: #e2411e !important;
}
button.account-btn-wrapper span.icon.mdi.mdi-google {
  color: #fff;
  font-size: 15px;
}
button.account-btn-wrapper a.google-word {
  color: #fff !important;
  font-size: 15px;
  text-transform: capitalize;
  padding-left: 8px;
}
button.account-btn-wrapper:hover {
  opacity: 0.8;
}
.login-btn-main-wrapper {
  justify-content: center;
}
.login-btn-main-wrapper button.faq-contact-submit-btn {
  width: 130px;
}
.google .google-button {
  padding: 25px 0px;
}
.row.alignment_wrapper {
  padding: 30px 70px 31px 154px;
}
button.download-btn {
  background: #552cf6 !important;
  color: #fff !important;
  padding: 20px 30px !important;
  text-transform: capitalize;
}
.v-application a {
  color: #fff !important;
}

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
.login-wrapper {
  justify-content: left;
  margin-left: 10px;
}
.login-wrapper button {
  width: 100px !important;
  height: 40px !important;
  text-transform: capitalize;
  letter-spacing: normal;
}
a.router-link-wrapper {
  color: #fff !important;
}
a,
u {
  text-decoration: none;
}
</style>

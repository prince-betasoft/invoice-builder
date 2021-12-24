<template>
  <div class="home">
    <HelloWorld msg="Login" />
    <v-app>
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
                    placeholder="Email Address..."
                    v-model="email"
                    class="form-control"
                    prepend-icon="person"
                    :rules="emailRules"
                    label="Email"
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
                    class="form-control"
                    prepend-icon="lock"
                    hide-details="auto"
                    outlined
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="login-btn-main-wrapper">
                <!-- <v-spacer></v-spacer> -->
                <v-btn
                  :disabled="!valid"
                  color="primary"
                  class="faq-contact-submit-btn"
                  type="submit"
                  @click="login"
                >
                  Sign In
                </v-btn>
              </v-card-actions>
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
import HelloWorld from "@/components/HelloWorld.vue";
// import * as firebase from "firebase/app";
import "firebase/auth";
// import HelloWorld from "../components/HelloWorld";

import firebase from "firebase";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((response) => {
          alert("Successfully logged in");
          var db = firebase.firestore();
          db.collection("users")
            .where("uid", "==", response.uid)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                console.log(response.uid, " => ", doc.data());
                let user_type = doc.data().user_type;
                if (user_type == "Admin") {
                  this.$router.push("/admin");
                } else if (user_type == "Customer") {
                  this.$router.push("/customer");
                }
              });
            });
          // this.$router.push("/dashboard");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    created() {
      firebase.auth().onAuthStateChanged((userAuth) => {
        if (userAuth) {
          firebase
            .auth()
            .currentUser.getIdTokenResult()
            .then((tokenResult) => {
              console.log("🍎 ", tokenResult.claims);
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
          this.$router.push("/dashboard");
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
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: "",
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
</style>

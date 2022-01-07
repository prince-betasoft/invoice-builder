<template>
  <div>
    <div id="my-signin2"></div>
    <header class="header-area fixed_header">
      <v-card-actions class="login-btn-main-wrapper">
        <v-card-actions class="dashboard-header-logo-wrapper"> </v-card-actions>
        <router-link to="/create-invoice"> Create Invoice</router-link>
      </v-card-actions>
    </header>
    <v-app>
      <v-main>
        <v-container fluid>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark>
                  <v-toolbar-title>Create a free account</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form
                    @submit.prevent="onSubmit"
                    ref="form"
                    v-model="valid"
                    lazy-validation
                  >
                    <v-container fluid>
                      <v-row>
                        <v-col cols="12">
                          <p style="text-align: left">I am signing up as</p>
                          <v-radio-group v-model="user_type" row>
                            <v-radio
                              label="an individual"
                              value="Individual"
                            ></v-radio>
                            <v-radio
                              label="a company"
                              value="Company"
                            ></v-radio>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                    </v-container>

                    <div v-if="user_type == 'Individual'">
                      <v-row>
                        <v-col cols="12" lg="6" md="6" sm="6">
                          <v-text-field
                            type="text"
                            v-model="firstName"
                            class="form-control"
                            label="First Name"
                            required
                            :rules="firstNameRules"
                            hide-details="auto"
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="6" md="6" sm="6">
                          <v-text-field
                            type="text"
                            label="Last Name"
                            v-model="lastName"
                            class="form-control"
                            required
                            :rules="lastNameRules"
                            hide-details="auto"
                            outlined
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <br />
                    </div>

                    <div v-else>
                      <v-text-field
                        type="text"
                        label="Company Name"
                        v-model="companyName"
                        class="form-control"
                        required
                        :rules="companyRules"
                        hide-details="auto"
                        outlined
                      ></v-text-field>
                      <br />
                    </div>
                    <v-text-field
                      type="email"
                      label="Email Address"
                      v-model="email"
                      :rules="emailRules"
                      maxlength="200"
                      class="form-control"
                      required
                      hide-details="auto"
                      outlined
                    ></v-text-field>
                    <br />
                    <v-text-field
                      v-model="password"
                      label="Password"
                      type="password"
                      class="form-control"
                      :rules="passwordRules"
                      maxlength="50"
                      required
                      hide-details="auto"
                      outlined
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions class="login-btn-main-wrapper">
                  <v-btn
                    :disabled="!valid"
                    color="primary"
                    class="faq-contact-submit-btn"
                    type="submit"
                    @click="onSubmit"
                  >
                    Create Account<i class="fas fa-chevron-right ml-2"></i>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script
  src="https://apis.google.com/js/platform.js?onload=renderButton"
  async
  defer
></script>
<script>
import firebase from "firebase";
import "firebase/firestore";
import Toaster from "../services/sweetToaster.js";

export default {
  name: "Register",
  components: {},
  methods: {
    async onSubmit() {
      const check = this.$refs.form.validate();
      if (check) {
        var response = await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .catch(function (error) {
            return false;
          });

        if (!response) {
          Toaster.error("An account already exists for this email", "error");
        } else {
          console.log("userId", response.uid);
          console.log("userType", this.user_type);
          var db = firebase.firestore();
          db.collection("users")
            .doc(response.uid)
            .set({
              uid: response.uid,
              user_type: this.user_type,
              FirstName: this.firstName,
              LastName: this.lastName,
              CompanyName: this.companyName,
              email: this.email,
            })
            .then(() => {
              Toaster.success("Registered Successfully!", "success");
              this.$router.push("/new-invoice");
            })
            .catch((error) => {
              console.error("Error : ", error);
            });
          //this.props.history.push("/");
        }
      }
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
    firstName: "",
    lastName: "",
    companyName: "",
    firstNameRules: [
      (v) => !!v || "Please complete this mandatory field.",
      (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
    ],
    lastNameRules: [
      (v) => !!v || "Please complete this mandatory field.",
      (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
    ],
    emailRules: [
      (v) => !!v || "Please complete this mandatory field.",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [
      (v) => !!v || "Please complete this mandatory field.",
      (v) => (v && v.length > 5) || "Password must at least 6 characters",
    ],
    companyRules: [
      (v) => !!v || "Please complete this mandatory field.",
      (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
    ],
    password: "",
    user: null,
    user_type: "Individual",
    items: ["Individual", "Company"],
  }),
};
function onSuccess(googleUser) {
  console.log("Logged in as: " + googleUser.getBasicProfile().getName());
}
function onFailure(error) {
  console.log(error);
}
function renderButton() {
  gapi.signin2.render("my-signin2", {
    scope: "profile email",
    width: 240,
    height: 50,
    longtitle: true,
    theme: "dark",
    onsuccess: onSuccess,
    onfailure: onFailure,
  });
}
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
  width: 200px;
}
.google .google-button {
  padding: 25px 0px;
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
  width: 190px;
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

<template>
  <div class="RegisterCustomer">
    <HelloWorld msg="Register" />
    <div id="my-signin2"></div>

    <v-app>
      <v-content>
        <v-container fluid>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark>
                  <v-toolbar-title>Register Customer</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form
                    @submit.prevent="onSubmit"
                    ref="form"
                    v-model="valid"
                    lazy-validation
                  >
                    <v-text-field
                      type="email"
                      placeholder="Email Address..."
                      v-model="email"
                      :rules="emailRules"
                      class="form-control"
                      prepend-icon="person"
                      label="Email"
                      required
                      hide-details="auto"
                      outlined
                    ></v-text-field>

                    <br />

                    <v-text-field
                      v-model="password"
                      label="Password"
                      type="password"
                      prepend-icon="lock"
                      required
                      hide-details="auto"
                      outlined
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions class="login-btn-main-wrapper">
                  <v-btn
                    :disabled="!valid"
                    color="orange"
                    class="faq-contact-submit-btn"
                    type="submit"
                    @click="onSubmit"
                  >
                    Register Customer
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script
  src="https://apis.google.com/js/platform.js?onload=renderButton"
  async
  defer
></script>
<script>
import HelloWorld from "@/components/HelloWorld.vue";
import firebase from "firebase";
import "firebase/auth";

export default {
  name: "RegisterCustomer",
  components: {
    HelloWorld,
  },
  methods: {
    async onSubmit() {
      let admin = {
        role: {
          admin: false,
        },
      };
      let user_type = "user";
      var response = await firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .catch(function (error) {
          return false;
        });
      if (!response) {
        alert("Oops... Registration falied!");
      } else {
        var db = firebase.firestore();
        db.collection("users")
          .doc(response.uid)
          .set({
            uid: response.uid,
            role: admin.role,
            user_type: user_type,
          })
          .then(() => {
            alert("Customer Registered Successfully !");
            this.$router.push("/customer");
          })
          .catch((error) => {
            console.error("Error : ", error);
          });

        //this.props.history.push("/");
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
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: "",
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
</style>

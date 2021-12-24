<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <h3 class="text-center">Update User</h3>
      <v-dialog v-model="dialogSender" persistent max-width="700px">
        <template v-slot:activator="{ on, attrs }">
          <div class="invoice-type-innerwrapper" v-bind="attrs" v-on="on">
            <label
              class="form-label-outside"
              style="text-transform: uppercase; font-size: 11px"
              >From</label
            >
          </div>
        </template>
        <v-card class="sender-modal-mainwrapper">
          <v-card-title>
            <i
              @click="dialogSender = false"
              class="fa fa-times sender-modalwrapper-closebtn"
              aria-hidden="true"
            ></i>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form ref="sender_form" @click="onUpdateForm" lazy-validation>
                <v-row>
                  <v-col cols="12" sm="6" md="8" lg="8">
                    <label class="form-label-outside"
                      >Company/ Client Name</label
                    >
                    <v-text-field
                      outlined
                      class="form-control"
                      v-model="invoiceSenderView.senderName"
                      required
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" lg="4">
                    <label class="form-label-outside">Country</label>
                    <v-text-field
                      outlined
                      class="form-control"
                      v-model="invoiceSenderView.senderCountry"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" lg="6">
                    <label class="form-label-outside">First Name</label>
                    <v-text-field
                      outlined
                      required
                      class="form-control"
                      v-model="invoiceSenderView.senderFirstName"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" lg="6">
                    <label class="form-label-outside">Last Name</label>
                    <v-text-field
                      outlined
                      required
                      class="form-control"
                      v-model="invoiceSenderView.senderLastName"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" lg="6">
                    <label class="form-label-outside taxt-registration-number"
                      ><i class="fa fa-pencil" aria-hidden="true"></i>Tax
                      Registration Number</label
                    >
                    <v-text-field
                      outlined
                      class="form-control"
                      v-model="invoiceSenderView.senderTaxNumber"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" lg="6">
                    <label class="form-label-outside">Email</label>
                    <v-text-field
                      outlined
                      required
                      class="form-control"
                      v-model="invoiceSenderView.senderEmail"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <div class="border-wrapper-modal"></div>
                  </v-col>
                  <v-col cols="12" lg="6">
                    <label class="form-label-outside">Address 1</label>
                    <v-text-field
                      outlined
                      class="form-control"
                      v-model="invoiceSenderView.senderAddress1"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" lg="6">
                    <label class="form-label-outside">Address 2</label>
                    <v-text-field
                      outlined
                      class="form-control"
                      v-model="invoiceSenderView.senderAddress2"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" lg="6">
                    <label class="form-label-outside">Phone</label>
                    <v-text-field
                      outlined
                      class="form-control"
                      v-model="invoiceSenderView.senderPhone"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" lg="6">
                    <label class="form-label-outside">Website</label>
                    <v-text-field
                      outlined
                      class="form-control"
                      v-model="invoiceSenderView.senderWebsite"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-card-actions class="sender-btnwrapper">
                      <v-btn> Update Sender Details </v-btn>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
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

export default {
  data() {
    return {
      invoiceSenderView: {},
      dialogSender: false,
    };
  },
  created() {
    var db = firebase.firestore();
    let dbRef = db.collection("invoiceSenderViews").doc(this.$route.params.id);
    dbRef
      .get()
      .then((doc) => {
        this.invoiceSenderView = doc.data();
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    onUpdateForm() {
      //   event.preventDefault();
      var db = firebase.firestore();
      db.collection("invoiceSenderViews")
        .doc(this.$route.params.id)
        .update(this.invoiceSenderView)
        .then(() => {
          console.log("User successfully updated!");
          // this.$router.push("/list");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

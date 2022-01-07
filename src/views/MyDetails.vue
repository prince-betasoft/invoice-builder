<template>
  <v-app>
    <UserDashboard msg="Login" />
    <v-main class="wrapper">
      <v-card class="mx-auto" max-width="800">
        <v-card-text>
          <div>
            <v-container fluid>
              <v-row>
                <v-col cols="12">
                  <label class="form-label-outside"
                    ><h2 style="text-align: left">I am</h2></label
                  >
                  <v-radio-group v-model="user_type" row>
                    <v-radio label="an individual" value="Individual"></v-radio>
                    <v-radio label="a company" value="Company"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-card-actions class="sender-btnwrapper">
                  <v-btn color="primary"> Save </v-btn>
                </v-card-actions>
              </v-row>
            </v-container>
            <br />
            <hr />
            <br />
            <label class="form-label-outside"
              ><h2 style="text-align: left">Invoice Sender Details</h2></label
            >
            <v-container>
              <v-form ref="sender_form" @click="onFormSubmit" lazy-validation>
                <v-row class="invoice-box">
                  <v-col cols="12" sm="6" md="8" lg="8">
                    <label class="form-label-outside">Sender / Name</label>
                    <v-text-field
                      outlined
                      class="form-control"
                      v-model="invoiceSenderView.senderName"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" lg="4">
                    <div class="country-selectb">
                      <label class="form-label-outside">Country</label>
                      <v-select
                        v-model="invoiceSenderView.senderCountry"
                        :items="currencies"
                        outlined
                        required
                        class="form-control"
                        :rules="countryRules"
                        item-text="name"
                        item-value="id"
                        hide-details="auto"
                      ></v-select>
                    </div>
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
                    <label class="form-label-outside">Email</label>
                    <v-text-field
                      outlined
                      required
                      class="form-control"
                      maxlength="200"
                      v-model="invoiceSenderView.senderEmail"
                      hide-details="auto"
                      :rules="emailRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" lg="6">
                    <label class="form-label-outside">Address 2</label>
                    <v-text-field
                      outlined
                      maxlength="200"
                      class="form-control"
                      v-model="invoiceSenderView.senderAddress2"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" lg="6">
                    <label class="form-label-outside">Phone</label>
                    <v-text-field
                      outlined
                      onselectstart="return false"
                      onpaste="return false;"
                      onCopy="return false"
                      onCut="return false"
                      onDrag="return false"
                      onDrop="return false"
                      autocomplete="off"
                      class="form-control"
                      @keypress="onlyNumbers"
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
                  <v-col cols="12" lg="6">
                    <label class="form-label-outside">
                      PAN / Tax Registration Number</label
                    >
                    <v-text-field
                      outlined
                      class="form-control"
                      v-model="invoiceSenderView.senderTaxNumber"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-card-actions class="sender-btnwrapper">
                    <v-btn color="primary" @click="setSender">
                      Save Sender Details
                    </v-btn>
                  </v-card-actions>
                </v-row>
              </v-form>
            </v-container>
            <br />
            <hr />
            <br />
            <label class="form-label-outside"
              ><h2 style="text-align: left">Invoice Screen Logo</h2></label
            >
            <v-container fluid>
              <v-row>
                <v-col cols="8">
                  <p style="text-align: left">
                    Upload a logo to be shown on your invoices. If your new logo
                    doesn't show up, please clear your cache and refresh the
                    page.
                  </p>
                </v-col>

                <v-form @click="onSubmitInvoiceLogo">
                  <div v-if="imageData == null" style="padding-bottom: 0px">
                    <div>
                      <v-btn
                        title="Add New select a file"
                        @click="click1"
                        class="placeholder"
                        color="primary"
                      >
                        Choose Invoice Logo
                      </v-btn>

                      <input
                        type="file"
                        ref="input1"
                        style="display: none"
                        @change="previewImage"
                        accept="image/*"
                        class="white--text"
                        color="purple darken-2"
                      />
                    </div>
                  </div>
                  <div v-else cols="4">
                    <div v-if="imageData != null">
                      <div v-if="isSpinner" class="pt-12 pb-12 text-center">
                        <v-progress-circular
                          indeterminate
                          color="primary"
                        ></v-progress-circular>
                      </div>
                      <img
                        class="preview"
                        object-fit:
                        cover
                        width="100%"
                        :src="img1"
                      />
                      <v-btn
                        title="Remove logo"
                        @click="reset"
                        class="placeholder"
                        color="primary"
                      >
                        Remove Logo
                      </v-btn>
                      <br />
                    </div>
                  </div>
                </v-form>
              </v-row>
            </v-container>
          </div>
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>
<script
  src="https://apis.google.com/js/platform.js?onload=renderButton"
  async
  defer
></script>
<script>
import UserDashboard from "@/views/dashboard.vue";
import firebase from "firebase";
import "firebase/firestore";
import currencyJson from "../data/currencies.json";
import Toaster from "../services/sweetToaster.js";

export default {
  currencyJson: currencyJson,
  name: "myDetails",
  components: {
    UserDashboard,
  },

  data() {
    return {
      user_type: "Individual",
      isSpinner: true,
      caption: "",
      img1: "",
      imageData: null,
      countryCurrencySymbol: {
        currencies: [],
      },
      currencies: [],
      invoiceSenderView: {},
      clipped: false,
      drawer: true,
      fixed: false,

      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
      fav: true,
      menu: false,
      message: false,
      hints: true,
      countryRules: [(v) => !!v || "Please complete this mandatory field."],
      emailRules: [
        (v) => !!v || "Please complete this mandatory field.",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    click1() {
      this.$refs.input1.click();
      const post = {
        photo: this.img1,
        caption: this.caption,
      };
      firebase
        .database()
        .ref("PhotoGallery")
        .push(post)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.img1 = null;
      this.imageData = event.target.files[0];
      this.onUpload();
    },
    reset() {
      this.img1 = null;
    },
    onUpload() {
      this.img1 = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.isSpinner = true;
            this.img1 = url;
            this.isSpinner = false;
          });
        }
      );
    },
    onFormSubmit() {
      var db = firebase.firestore();
      db.collection("invoiceSenderViews")
        .add(this.invoiceSenderView)
        .then(() => {
          this.invoiceSenderView.senderName = "";
          this.invoiceSenderView.senderCountry = "";
          this.invoiceSenderView.senderFirstName = "";
          this.invoiceSenderView.senderLastName = "";
          this.invoiceSenderView.taxRegistrationNumber = "";
          this.invoiceSenderView.senderTaxNumber = "";
          this.invoiceSenderView.senderEmail = "";
          this.invoiceSenderView.senderAddress1 = "";
          this.invoiceSenderView.senderAddress2 = "";
          this.invoiceSenderView.senderPhone = "";
          this.invoiceSenderView.senderWebsite = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onlyNumbers(event) {
      let keyCode = event.keyCode ? event.keyCode : event.which;
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        event.preventDefault();
      }
    },
    setSender() {
      const check = this.$refs.sender_form.validate();
      if (check) {
        Toaster.success("Settings Saved successfully!", "success");
        this.onFormSubmit();
      }
    },
    onSubmitInvoiceLogo() {
      const formData = new FormData();
      formData.append("invoiceLogo", this.invoiceLogo.logoImage);
      var db = firebase.firestore();
      db.collection("invoiceLogoImages")
        .add(formData)
        .then(() => {
          this.invoiceLogo.logoImage = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleFileUpload(e) {
      console.log(e);
    },
  },
  created() {
    var db = firebase.firestore();
    let dbRef = db.collection("invoiceSenderViews").doc(this.invoiceSenderView);
    dbRef
      .get()
      .then((doc) => {
        let data = doc.data();
        this.invoiceSenderView.senderName = data.senderName;
        this.invoiceSenderView.senderCountry = data.senderCountry;
        this.invoiceSenderView.senderFirstName = data.senderFirstName;
        this.invoiceSenderView.senderLastName = data.senderLastName;
        this.invoiceSenderView.taxRegistrationNumber =
          data.taxRegistrationNumber;
        this.invoiceSenderView.senderTaxNumber = data.senderTaxNumber;
        this.invoiceSenderView.senderEmail = data.senderEmail;
        this.invoiceSenderView.senderAddress1 = data.senderAddress1;
        this.invoiceSenderView.senderAddress2 = data.senderAddress2;
        this.invoiceSenderView.senderPhone = data.senderPhone;
        this.invoiceSenderView.senderWebsite = data.senderWebsite;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mounted() {
    this.currencies = currencyJson;
  },
};
</script>

<style scoped>
button.downlaod-btn {
  background: #552cf6 !important;
  color: #fff !important;
  padding: 20px 30px !important;
}
button.downlaod-btn:hover {
  background: #285cff !important;
}

a.router-link-wrapper {
  color: #fff !important;
}
a,
u {
  text-decoration: none;
}
.row.justify-center {
  padding: 31px;
}
.background_color {
  width: 100%;
  background: #f6f5f9;
}
.layout.login-page-main-wrapper {
  justify-content: center;
  background-color: #f8f8f8;
}
.login-form-body-wrapper {
  padding: 50px;
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

.bank-template-mainwrapper {
  padding: 30px;
  order: 1px solid rgba(0, 0, 0, 0.07) !important;
  background: #fff;
  box-shadow: 2px 2px 0 rgb(0 0 0 / 7%), 1px 1px 3px rgb(0 0 0 / 6%) !important;
  border-radius: 4px;
}
.bank-template-mainwrapper label {
  color: #888;
  font-size: 14px;
  margin-bottom: 1rem;
}

.sender-contentbodywrapper {
  position: absolute;
  top: 32px;
}
.sender-contentbodywrapper span {
  position: absolute;
  font-size: 25px;
}
.sender-contentbodywrapper h5 {
  font-size: 15px;
  font-weight: 400;
  padding-left: 40px;
}
.sender-contentbodywrapper p {
  font-size: 12px;
  padding-left: 40px;
  color: #bbb;
  font-weight: 300;
  letter-spacing: 0.5px;
}
.recipientbackground-wrapper {
  position: absolute;
  top: 32px;
}
.recipientbackground-wrapper span {
  position: absolute;
  font-size: 25px;
}
.recipientbackground-wrapper h5 {
  font-size: 15px;
  font-weight: 400;
  padding-left: 40px;
}
.recipientbackground-wrapper p {
  font-size: 12px;
  padding-left: 40px;
  color: #bbb;
  font-weight: 300;
  letter-spacing: 0.5px;
}
.due-date-calanderwrapper {
  height: 50px !important;
  width: 120px;
  display: flex;
  justify-content: center;
  padding: 0px;
  margin-left: 2px;
  align-items: center;
}
.due-date-calanderwrapper span {
  font-size: 14px;
}
.due-content-heading {
  display: flex;
  justify-content: end;
  align-items: center;
}
.due-content-heading h4 {
  font-size: 15px;
}
.invoice-mainwrapper {
  padding: 2px 0px;
}
.invoice-contentwrapper {
  padding: 2px 0px;
}
.invoice-contentwrapper .invoice-type-innerwrapper {
  padding: 0px;
  width: 124px;
  height: 20px;
  display: flex;
  align-items: center;
}
.invoice-contentwrapper span {
  font-size: 12px;
}
.invoice-mainwrapper h4 {
  font-size: 14px;
  text-align: left;
}
.invoice-setting-innerwrapper h4 {
  padding: 0 0 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  margin-bottom: 40px;
  text-align: left;
  color: #000;
}
.currency-symbol-mainwrapper {
  text-align: left;
  margin-bottom: 10px;
}
.currency-symbol-mainwrapper label {
  font-size: 15px;
}
.addpayment-line-wrapper {
  text-align: left;
}
.addpayment-line-wrapper ul {
  list-style-type: none;
  padding-left: 0px;
}
.addpayment-line-wrapper ul li {
  padding: 10px;
  margin-bottom: 10px;
  font-size: 14px;
}
.addpayment-line-wrapper ul li:hover {
  background-color: #fff;
  border-radius: 4px;
}
.addpayment-line-wrapper ul li.delete-icon-innerwrapepr:hover {
  background-color: #ea736a !important;
  color: #fff !important;
  border-radius: 4px;
}
.addpayment-line-wrapper ul li i {
  padding-right: 10px;
  font-weight: 400;
}
.invoice-type-innerwrapper:hover {
  outline: 2px solid #257eff;
}
.preview:hover {
  outline: 2px solid #257eff;
}
.invoice-mainbodywrapper hr {
  color: #999 !important;
  margin: 5px 0px 23px;
  border-top: 1px solid #eee;
}
button.save-btn {
  background: #dedce6 !important;
  color: #000 !important;
  cursor: pointer;
  padding: 20px 30px !important;
  box-shadow: none !important;
}
button.save-btn:hover {
  background: #2cadf6 !important;
  color: #fff !important;
}
button.downlaod-btn {
  background: #552cf6 !important;
  color: #fff !important;
  /* padding: 20px 30px !important; */
}
button.downlaod-btn:hover {
  background: #285cff !important;
}
.sender-modal-mainwrapper label {
  display: flex;
  font-size: 13px;
  color: #7d8592;
}
i.fa.fa-times.sender-modalwrapper-closebtn {
  background-color: #fafafa !important;
  box-shadow: none !important;
  position: absolute;
  right: 10px;
  top: 5px;
  opacity: 0.4;
}
i.fa.fa-times.sender-modalwrapper-closebtn:hover {
  opacity: 1;
}
i.fa.fa-times.sender-modalwrapper-closebtn {
  font-size: 25px !important;
  font-weight: 300;
}
i.fa.fa-times.sender-modalwrapper-closebtn:hover {
  background-color: #fafafa !important;
}
.sender-modal-mainwrapper .v-card__title {
  border-bottom: 1px solid #e1e6ef;
  background: #fafafa;
  height: 50px;
}
button.sender-modalwrapper-closebtn:hover::before {
  opacity: 0 !important;
}
.sender-btnwrapper button {
  width: 100%;
  background: #285cff !important;
  border: none;
  color: #fff !important;
  text-transform: capitalize;
  font-weight: 400 !important;
  font-size: 15px;
}
.border-wrapper-modal::before {
  content: "";
  width: 88%;
  height: 1px;
  background-color: #eee;
  position: absolute;
  left: 34px;
}
span.new-client-innerwrapper {
  font-size: 17px;
  margin-top: -6px;
}
.new-client-innerwrapper {
  justify-content: right;
}
.new-client-innerwrapper button {
  background: #285cff !important;
  color: #fff !important;
  border: none;
  border-radius: 0px !important;
}
.new-client-innerwrapper button:hover {
  border: 1px solid #458ccf;
  box-shadow: inset 0 0 0 1px #458ccf;
  background: rgba(69, 140, 207, 0.05) !important;
  color: #458ccf !important;
}
label.form-label-outside.taxt-registration-number::after {
  content: "";
  position: absolute;
  border-bottom: 1px dashed #000;
  width: 150px;
  margin-top: 18px;
  margin-left: 1px;
}
label.form-label-outside.taxt-registration-number i {
  font-size: 10px !important;
  padding-top: 8px;
  margin-right: 8px;
  color: #000 !important;
}
.sender-modal-mainwrapper .v-card__text {
  background-color: #fefefe;
}
.getlink-modalwrapper .v-card__text {
  padding: 25px 8px 10px !important;
  border: 1px solid rgba(0, 0, 0, 0.3);
}
.getlink-modalwrapper .v-card__text button {
  width: 80%;
  box-shadow: none !important;
  background: #285cff !important;
  color: #fff !important;
}
.drap-icon-inputfield {
  position: absolute;
  top: -8px;
  width: 27%;
}
.invoice-type-innerwrapper.mainwrapper-first-row p {
  font-size: 14px !important;
  margin-bottom: 0px !important;
  color: #888;
  width: 75px;
}
.invoice-contentwrapper input {
  width: 100px;
  font-size: 13px !important;
}
.invoice-contentwrapper input:focus-visible {
  border: none !important;
  outline: none;
}

/********************************table css */
.invoice-box {
  padding: 9px;
  font-size: 16px;
  color: #555;
}
.invoice-box table {
  width: 100%;
  line-height: inherit;
  text-align: left;
}
.invoice-box table td {
  padding: 5px;
}
.invoice-box table tr.top table td {
  padding-bottom: 20px;
}

.invoice-box table tr.top table td.title {
  font-size: 45px;
  line-height: 45px;
  color: #333;
}

.invoice-box table tr.information table td {
  padding-bottom: 40px;
}
.invoice-box table tr.heading {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  display: block;
}
.invoice-box table tr.details td {
  padding-bottom: 20px;
}
.invoice-box table tr.item td {
  border-bottom: 1px solid #eee;
  font-size: 13px;
}
.invoice-box table tr.item input {
  padding-left: 5px;
}
.invoice-box table tr.total td:nth-child(2) {
  border-top: 2px solid #eee;
  font-weight: bold;
}
@media only screen and (max-width: 600px) {
  .invoice-box table tr.top table td {
    width: 100%;
    display: block;
    text-align: center;
  }

  .invoice-box table tr.information table td {
    width: 100%;
    display: block;
    text-align: center;
  }
}

/* RTL */
.rtl {
  direction: rtl;
  font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial,
    sans-serif;
}

.rtl table {
  text-align: right;
}

.rtl table tr td:nth-child(2) {
  text-align: left;
}
/* image css here  */
.image-input {
  display: block;
  width: 200px;
  height: 200px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}
.placeholder {
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 14px;
  font-family: Helvetica;
}
.placeholder:hover {
  background: #285cff;
  color: #fff !important;
  border: none;
}
.file-input {
  display: none;
}
.remove-logo {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  outline: 2px solid #46baf9;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.invoice-box {
  text-align: left !important;
}
</style>

<template>
  <div class="RegisterCustomer">
    <HelloWorld msg="Register" />
    <div id="my-signin2"></div>
    <v-app class="background_color">
      <v-container style="width: 1000px">
        <v-row>
          <v-col cols="4">
            <v-select
              :items="templates"
              class="form-control"
              v-model="invoiceAllDetails.defaultTemplete"
              outlined
            ></v-select>
          </v-col>
          <v-col cols="4"></v-col>
          <v-col cols="4">
            <div class="save-download-bankbody-wrapper">
              <v-btn @click="saveInvoiceData" class="save-btn">Save</v-btn
              ><v-btn @click="printInvoice" class="downlaod-btn"
                >Download</v-btn
              >
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8">
            <v-card class="bank-template-mainwrapper">
              <v-row>
                <v-col cols="6">
                  <div class="invoice-type-innerwrapper mainwrapper-first-row">
                    <div class="drag-filebackground">
                      <label class="form-label-outside"
                        >Drag your logo here</label
                      >
                      <div class="select-fileinner-wrapper">
                        <p>select a fiile</p>
                        <v-file-input
                          hide-details="auto"
                          multiple
                          prepend-icon=""
                          class="drap-icon-inputfield"
                        ></v-file-input>
                        <!-- <v-file-input
                          id="invoice_logo"
                          ref="invoice_logo"
                          v-model="invoiceAllDetails.invoiceLogo"
                          outlined
                          prepend-icon=""
                          hide-details="auto"
                          placeholder="Upload File"
                          class="form-control"
                          @change="handleFileUpload"
                        ></v-file-input> -->
                      </div>
                    </div>
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="invoice-type-innerwrapper mainwrapper-first-row">
                    <v-dialog
                      v-model="InvoiceDialog"
                      persistent
                      max-width="250px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <div v-bind="attrs" v-on="on">
                          <label class="form-label-outside">Invoice</label>
                          <div
                            v-for="InvoiceTypeView in InvoiceDetailsOverview"
                            :key="InvoiceTypeView.key"
                          >
                            <div>
                              {{ InvoiceTypeView.invoiceType }}
                            </div>
                          </div>
                        </div>
                      </template>
                      <v-card class="invoice-modalwrapper delete-invoicemodal">
                        <v-card-title>
                          <span class="new-client-innerwrapper"
                            >Invoice Type</span
                          >
                          <i
                            text
                            @click="InvoiceDialog = false"
                            class="fa fa-times sender-modalwrapper-closebtn"
                            aria-hidden="true"
                          ></i>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-form @click="onSubmitInvoice">
                              <v-row>
                                <v-col cols="12" lg="12">
                                  <v-select
                                    :items="invoiceType"
                                    v-model="InvoiceTypeView.invoiceType"
                                    outlined
                                    item-text="name"
                                    item-value="id"
                                    hide-details="auto"
                                  ></v-select>
                                </v-col>
                              </v-row>
                            </v-form>
                            <div
                              class="new-client-innerwrapper set-invoice-modal"
                            >
                              <v-btn @click="setInvoiceType">
                                Set Invoice Type
                              </v-btn>
                            </div>
                          </v-container>
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-dialog v-model="dialogSender" persistent max-width="700px">
                    <template v-slot:activator="{ on, attrs }">
                      <div
                        class="invoice-type-innerwrapper"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <label
                          class="form-label-outside"
                          style="text-transform: uppercase; font-size: 11px"
                          >From</label
                        >
                        <!-- <div v-if="invoiceSenderView"> -->

                        <div
                          v-for="invoiceSenderView in Users"
                          :key="invoiceSenderView.key"
                        >
                          <div>
                            <b>{{ invoiceSenderView.senderName }}</b>
                          </div>

                          <div>
                            {{ invoiceSenderView.senderCountry }}
                          </div>
                          <div>
                            {{ invoiceSenderView.senderFirstName }}
                          </div>
                          <div>
                            {{ invoiceSenderView.senderLastName }}
                          </div>
                          <div>
                            {{ invoiceSenderView.senderTaxNumber }}
                          </div>
                          <div>
                            {{ invoiceSenderView.senderEmail }}
                          </div>
                          <div>
                            {{ invoiceSenderView.senderAddress1 }}
                          </div>
                          <div>
                            {{ invoiceSenderView.senderAddress2 }}
                          </div>
                          <div>
                            {{ invoiceSenderView.senderPhone }}
                          </div>
                          <div>
                            {{ invoiceSenderView.senderWebsite }}
                          </div>
                        </div>
                        <!-- </div> -->
                        <!-- <div v-else>
                          <div class="sender-contentbodywrapper">
                            <span><i class="fas fa-user"></i></span>
                            <h5>Sender Name</h5>
                            <p>Sender Contact Details</p>
                          </div>
                        </div> -->
                        <v-col v-if="!isHiddenCompanyInfo">
                          <v-text-field
                            outlined
                            class="form-control"
                            v-model="invoiceAllDetails.companyInfo"
                            hide-details="auto"
                          ></v-text-field>
                        </v-col>

                        <v-col
                          v-if="paymentOverview.displayLocation == 'Sender'"
                        >
                          <div
                            v-for="paymentOverview in PaymentDetailsOverview"
                            :key="paymentOverview.key"
                          >
                            <div>
                              <b>{{ paymentOverview.paymentType }}</b>
                            </div>

                            <div>
                              {{ paymentOverview.paymentDetails }}
                            </div>
                          </div>
                        </v-col>
                      </div>
                    </template>
                    <v-card class="sender-modal-mainwrapper">
                      <v-card-title>
                        <!-- <span class="text-h5">User Profile</span> -->
                        <i
                          @click="dialogSender = false"
                          class="fa fa-times sender-modalwrapper-closebtn"
                          aria-hidden="true"
                        ></i>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-form
                            ref="sender_form"
                            @click="onFormSubmit"
                            lazy-validation
                          >
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
                                  :rules="nameRules"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4" lg="4">
                                <label class="form-label-outside"
                                  >Country</label
                                >
                                <v-select
                                  v-model="invoiceSenderView.senderCountry"
                                  :items="currencies"
                                  outlined
                                  item-text="name"
                                  item-value="id"
                                  hide-details="auto"
                                ></v-select>
                              </v-col>
                              <v-col cols="12" lg="6">
                                <label class="form-label-outside"
                                  >First Name</label
                                >
                                <v-text-field
                                  outlined
                                  required
                                  class="form-control"
                                  v-model="invoiceSenderView.senderFirstName"
                                  :rules="firstNameRules"
                                  hide-details="auto"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" lg="6">
                                <label class="form-label-outside"
                                  >Last Name</label
                                >
                                <v-text-field
                                  outlined
                                  required
                                  class="form-control"
                                  v-model="invoiceSenderView.senderLastName"
                                  :rules="lastNameRules"
                                  hide-details="auto"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" lg="6">
                                <div class="registraction-inpu-modal">
                                  <i class="fa fa-pencil"></i
                                  ><input
                                    type="text"
                                    placeholder="Tax Registration Number"
                                  />
                                </div>
                                <v-text-field
                                  outlined
                                  class="form-control"
                                  v-model="invoiceSenderView.senderTaxNumber"
                                  hide-details="auto"
                                  :rules="globalRules"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" lg="6">
                                <label class="form-label-outside">Email</label>
                                <v-text-field
                                  outlined
                                  required
                                  class="form-control"
                                  :rules="emailRules"
                                  v-model="invoiceSenderView.senderEmail"
                                  hide-details="auto"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <div class="border-wrapper-modal"></div>
                              </v-col>
                              <v-col cols="12" lg="6">
                                <label class="form-label-outside"
                                  >Address 1</label
                                >
                                <v-text-field
                                  outlined
                                  :rules="globalRulesAddress"
                                  class="form-control"
                                  v-model="invoiceSenderView.senderAddress1"
                                  hide-details="auto"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" lg="6">
                                <label class="form-label-outside"
                                  >Address 2</label
                                >
                                <v-text-field
                                  outlined
                                  :rules="globalRulesAddress"
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
                                <label class="form-label-outside"
                                  >Website</label
                                >
                                <v-text-field
                                  outlined
                                  class="form-control"
                                  v-model="invoiceSenderView.senderWebsite"
                                  hide-details="auto"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-card-actions class="sender-btnwrapper">
                                  <v-btn @click="setSender">
                                    Set Sender Details
                                  </v-btn>
                                </v-card-actions>
                              </v-col>
                            </v-row>
                          </v-form>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </v-col>
                <v-col cols="6">
                  <v-dialog
                    v-model="dialogRecipient"
                    persistent
                    max-width="700px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <div
                        class="invoice-type-innerwrapper"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <label
                          class="form-label-outside"
                          style="text-transform: uppercase; font-size: 11px"
                          >To</label
                        >
                        <div v-if="invoiceSenderView">
                          <div
                            v-for="invoiceClientView in ClientUsers"
                            :key="invoiceClientView.key"
                          >
                            <div>
                              <b>{{ invoiceClientView.clientCompanyName }}</b>
                            </div>
                            <div>
                              {{ invoiceClientView.clientFirstName }}
                            </div>
                            <div>
                              {{ invoiceClientView.clientLastName }}
                            </div>
                            <div>
                              {{ invoiceClientView.clientEmail }}
                            </div>
                            <div>
                              {{ invoiceClientView.clientCountry }}
                            </div>
                            <div>
                              {{ invoiceClientView.clientAddress1 }}
                            </div>
                            <div>
                              {{ invoiceClientView.clientAddress2 }}
                            </div>
                            <div>
                              {{ invoiceClientView.clientPhone }}
                            </div>
                            <div>
                              {{ invoiceClientView.clientExtraData }}
                            </div>
                          </div>
                        </div>
                        <div v-else>
                          <div class="sender-contentbodywrapper">
                            <span><i class="fas fa-user"></i></span>
                            <h5>Recipient Name</h5>
                            <p>Recipient Contact Details</p>
                          </div>
                        </div>
                        <v-col v-if="!isHiddenClientInfo">
                          <v-text-field
                            outlined
                            class="form-control"
                            v-model="invoiceAllDetails.clientInfo"
                            hide-details="auto"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          v-if="paymentOverview.displayLocation == 'Receiver'"
                        >
                          <div
                            v-for="paymentOverview in PaymentDetailsOverview"
                            :key="paymentOverview.key"
                          >
                            <div>
                              <b>{{ paymentOverview.paymentType }}</b>
                            </div>

                            <div>
                              {{ paymentOverview.paymentDetails }}
                            </div>
                          </div>
                        </v-col>
                      </div>
                    </template>
                    <v-card class="sender-modal-mainwrapper">
                      <v-card-title>
                        <span class="new-client-innerwrapper">New Client</span>
                        <i
                          @click="dialogRecipient = false"
                          class="fa fa-times sender-modalwrapper-closebtn"
                          aria-hidden="true"
                        ></i>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-form
                            ref="client_form"
                            @click="onFormSubmitClient"
                            lazy-validation
                          >
                            <v-row>
                              <v-col cols="12">
                                <label class="form-label-outside"
                                  >Name / Company Name</label
                                >
                                <v-text-field
                                  outlined
                                  required
                                  :rules="nameRules"
                                  hide-details="auto"
                                  class="form-control"
                                  v-model="invoiceClientView.clientCompanyName"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" lg="6">
                                <label class="form-label-outside"
                                  >First Name</label
                                >
                                <v-text-field
                                  outlined
                                  class="form-control"
                                  v-model="invoiceClientView.clientFirstName"
                                  hide-details="auto"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" lg="6">
                                <label class="form-label-outside"
                                  >Last Name</label
                                >
                                <v-text-field
                                  outlined
                                  class="form-control"
                                  v-model="invoiceClientView.clientLastName"
                                  hide-details="auto"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" lg="8">
                                <label class="form-label-outside"
                                  >Email Address</label
                                >
                                <v-text-field
                                  outlined
                                  required
                                  :rules="emailRules"
                                  class="form-control"
                                  v-model="invoiceClientView.clientEmail"
                                  hide-details="auto"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4" lg="4">
                                <label class="form-label-outside"
                                  >Country</label
                                >
                                <v-select
                                  v-model="invoiceClientView.clientCountry"
                                  :items="currencies"
                                  outlined
                                  required
                                  :rules="countryRules"
                                  item-text="name"
                                  item-value="id"
                                  hide-details="auto"
                                ></v-select>
                              </v-col>
                              <v-col cols="12">
                                <div class="border-wrapper-modal"></div>
                              </v-col>
                              <v-col cols="12" lg="6">
                                <label class="form-label-outside"
                                  >Address Line 1</label
                                >
                                <v-text-field
                                  outlined
                                  required
                                  class="form-control"
                                  v-model="invoiceClientView.clientAddress1"
                                  hide-details="auto"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" lg="6">
                                <label class="form-label-outside"
                                  >Address Line 2</label
                                >
                                <v-text-field
                                  outlined
                                  required
                                  class="form-control"
                                  v-model="invoiceClientView.clientAddress2"
                                  hide-details="auto"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" lg="6">
                                <label class="form-label-outside">Phone</label>
                                <v-text-field
                                  outlined
                                  required
                                  class="form-control"
                                  v-model="invoiceClientView.clientPhone"
                                  hide-details="auto"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" lg="6">
                                <label class="form-label-outside"
                                  >Extra Data</label
                                >
                                <v-text-field
                                  outlined
                                  class="form-control"
                                  v-model="invoiceClientView.clientExtraData"
                                  required
                                  hide-details="auto"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-card-actions class="new-client-innerwrapper">
                                  <v-btn @click="setClient"> Submit </v-btn>
                                </v-card-actions>
                              </v-col>
                            </v-row>
                          </v-form>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-row>
              <v-row class="invoice-details-wrapper">
                <v-col cols="6">
                  <v-row>
                    <v-col cols="4" class="invoice-mainwrapper">
                      <h4>Invoice No:</h4></v-col
                    >
                    <v-col cols="8" class="invoice-contentwrapper">
                      <div class="invoice-type-innerwrapper">
                        <v-text-field
                          outlined
                          class="form-control"
                          v-model="invoiceAllDetails.invoiceNumber"
                          required
                          hide-details="auto"
                        ></v-text-field>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="4" class="invoice-mainwrapper">
                      <h4>Invoice Date:</h4></v-col
                    >
                    <v-col cols="8" class="invoice-contentwrapper">
                      <div class="invoice-type-innerwrapper">
                        <!-- <span>Dec 21st, 2021</span> -->
                      </div>
                    </v-col>
                    <vue-ctk-date-time-picker
                      v-model="invoiceAllDetails.invoiceDate"
                      classname="form-control"
                      :noLabel="true"
                      color="dodgerblue"
                      :only-date="true"
                      :no-shortcuts="true"
                      format="DD-MM-YYYY"
                      formatted="ll"
                      :range="false"
                    ></vue-ctk-date-time-picker>
                  </v-row>
                </v-col>
                <v-col cols="6">
                  <v-row>
                    <v-col
                      cols="3"
                      style="padding: 0px"
                      class="due-content-heading"
                    >
                      <h4>Due:</h4></v-col
                    >
                    <v-col cols="9" style="padding: 0px">
                      <div
                        class="
                          invoice-type-innerwrapper
                          due-date-calanderwrapper
                        "
                      >
                        <!-- <span>Dec 21st, 2021</span> -->
                      </div>
                    </v-col>
                    <vue-ctk-date-time-picker
                      v-model="invoiceAllDetails.dueDate"
                      :noLabel="true"
                      classname="form-control"
                      color="dodgerblue"
                      :only-date="true"
                      :no-shortcuts="true"
                      format="DD-MM-YYYY"
                      formatted="ll"
                      :range="false"
                    ></vue-ctk-date-time-picker>
                  </v-row>
                </v-col>
                <v-row> </v-row>
                <v-row>
                  <v-col v-if="!isHiddenDescription" cols="12">
                    <div class="add-new-iteamswrapper mainwrapper-first-row">
                      <v-text-field
                        v-model="invoiceAllDetails.invoiceDescription"
                        outlined
                        hide-details="auto"
                      ></v-text-field>
                    </div>
                  </v-col>
                  <v-col
                    v-if="paymentOverview.displayLocation == 'Description'"
                  >
                    <div
                      v-for="paymentOverview in PaymentDetailsOverview"
                      :key="paymentOverview.key"
                    >
                      <div>
                        <b>{{ paymentOverview.paymentType }}</b>
                      </div>

                      <div>
                        {{ paymentOverview.paymentDetails }}
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-row>
              <v-row class="invoice-line-iteams-wrapper">
                <div class="invoice-box">
                  <table
                    class="responsive-table"
                    cellpadding="0"
                    cellspacing="0"
                  >
                    <thead>
                      <tr class="heading">
                        <td>Item</td>
                        <td>HRS/QTY</td>
                        <td>Rate</td>
                        <td>Tax</td>
                        <td>SubTotal</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="item" :v-for="item in items">
                        <td>
                          <v-text-field
                            required
                            outlined
                            hide-details="auto"
                            v-model="items.description"
                          ></v-text-field>
                        </td>
                        <td>
                          <v-text-field
                            required
                            hide-details="auto"
                            outlined
                            type="value"
                            v-model="items.quantity"
                          ></v-text-field>
                        </td>
                        <td>
                          <v-text-field
                            required
                            hide-details="auto"
                            outlined
                            type="value"
                            v-model="items.rate"
                          ></v-text-field>
                        </td>
                        <td>
                          <v-text-field
                            required
                            outlined
                            hide-details="auto"
                            type="value"
                            v-model="items.tax"
                          ></v-text-field>
                        </td>
                        <td>{{ items.rate * items.quantity }}</td>
                      </tr>
                      <div class="table-delete-edit-btnwrapper">
                        <i
                          class="fa fa-pencil pencil-iconwrapper"
                          aria-hidden="true"
                        ></i
                        ><i
                          class="fa fa-trash trash-iconwrapper"
                          aria-hidden="true"
                        ></i>
                      </div>
                    </tbody>
                  </table>

                  <v-row>
                    <v-col cols="12">
                      <div class="description-mainwrapper">
                        <v-textarea
                          outlined
                          placeholder="Description"
                          hide-details="auto"
                        ></v-textarea>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <div class="add-new-iteamswrapper mainwrapper-first-row">
                        <v-btn @click="addNewItem">
                          Add New Invoice Item
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" lg="6" md="6"></v-col>
                    <v-col cols="12" lg="6" md="6">
                      <div class="main-heading-invoice">
                        <v-row>
                          <v-col cols="12" class="invoice-summary-wrapper">
                            <h4>Invoice Summary</h4>
                          </v-col>
                          <v-col
                            cols="12"
                            lg="6"
                            md="6"
                            class="subtotal-heading"
                            >Subtotal</v-col
                          >
                          <v-col
                            cols="12"
                            lg="6"
                            md="6"
                            class="subtotal-value"
                            >{{ items.rate * items.quantity }}</v-col
                          >
                          <v-col
                            cols="12"
                            lg="6"
                            md="6"
                            class="subtotal-heading"
                            >Tax</v-col
                          >
                          <v-col cols="12" lg="6" md="6" class="subtotal-value"
                            >2</v-col
                          >
                          <v-col
                            cols="12"
                            lg="6"
                            md="6"
                            class="subtotal-heading"
                            >Total
                            <span
                              class="
                                usd-modalwrapper
                                invoice-type-innerwrapper
                                mainwrapper-first-row
                              "
                              >(USD)</span
                            >
                            <v-select
                              v-model="countryCurrencySymbol.currencies"
                              :items="currencies"
                              outlined
                              required
                              :item-text="
                                (item) => item.iso_code + ' - ' + item.name
                              "
                              item-value="id"
                              hide-details="auto"
                            ></v-select>
                          </v-col>
                          <v-col
                            cols="12"
                            lg="6"
                            md="6"
                            class="subtotal-value"
                            >{{ items.rate * items.quantity }}</v-col
                          >
                          <v-col
                            cols="12"
                            lg="6"
                            md="6"
                            class="subtotal-heading"
                          ></v-col>
                          <v-col
                            cols="12"
                            lg="6"
                            md="6"
                            class="subtotal-value"
                          ></v-col>
                        </v-row>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <div class="input-terms-mainwrapper">
                    <input type="value" placeholder="Invoice Terms" />
                  </div>
                </v-col>
                <v-col v-if="paymentOverview.displayLocation == 'Terms'">
                  <div
                    v-for="paymentOverview in PaymentDetailsOverview"
                    :key="paymentOverview.key"
                  >
                    <div>
                      <b>{{ paymentOverview.paymentType }}</b>
                    </div>

                    <div>
                      {{ paymentOverview.paymentDetails }}
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="4">
            <div class="invoice-mainbodywrapper">
              <div class="invoice-setting-innerwrapper">
                <h4>
                  Invoice Settings <span class="ti-close close-settings"></span>
                </h4>
              </div>
              <v-col cols="12">
                <div class="currency-symbol-mainwrapper">
                  <label class="form-label-outside">Currency Symbol</label>
                  <v-select
                    v-model="invoiceAllDetails.currencySymbol"
                    class="form-control"
                    :items="currencies"
                    outlined
                    required
                    item-text="name"
                    item-value="id"
                    hide-details="auto"
                  ></v-select>
                </div>
              </v-col>
              <hr />
              <div class="addpayment-line-wrapper">
                <ul>
                  <v-dialog
                    v-model="addPaymentDetails"
                    persistent
                    max-width="350px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <li v-bind="attrs" v-on="on">
                        <i class="fas fa-dollar-sign"></i>Add payment details
                      </li>
                    </template>
                    <v-card class="invoice-modalwrapper delete-invoicemodal">
                      <v-card-title>
                        <i
                          text
                          @click="addPaymentDetails = false"
                          class="fa fa-times sender-modalwrapper-closebtn"
                          aria-hidden="true"
                        ></i>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-form @click="onSubmitPayment">
                            <v-row>
                              <v-col cols="12" lg="12">
                                <div class="registraction-inpu-modal">
                                  <i class="fa fa-pencil"></i
                                  ><input
                                    type="text"
                                    placeholder="Payment Type"
                                  />
                                </div>

                                <v-text-field
                                  outlined
                                  class="form-control"
                                  v-model="paymentOverview.paymentType"
                                  hide-details="auto"
                                  :rules="globalRules"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" lg="12">
                                <div class="registraction-inpu-modal">
                                  <i class="fa fa-pencil"></i
                                  ><input
                                    type="text"
                                    placeholder="Payment Details"
                                  />
                                </div>
                                <v-textarea
                                  outlined
                                  class="form-control"
                                  v-model="paymentOverview.paymentDetails"
                                  hide-details="auto"
                                  :rules="globalRulesAddress"
                                ></v-textarea>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" lg="12">
                                <label class="form-label-outside"
                                  >Display Location</label
                                >
                                <v-select
                                  :items="displayLocation"
                                  v-model="paymentOverview.displayLocation"
                                  outlined
                                  item-text="name"
                                  item-value="id"
                                  hide-details="auto"
                                ></v-select>
                              </v-col>
                            </v-row>
                          </v-form>
                          <div
                            class="new-client-innerwrapper set-invoice-modal"
                          >
                            <v-btn @click="setPaymentDetails"> Submit </v-btn>
                          </div>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-dialog>

                  <v-form @click="onSubmitAllDetails">
                    <li @click="isHiddenCompanyInfo = !isHiddenCompanyInfo">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                      Add company info
                    </li>
                    <li @click="isHiddenDescription = !isHiddenDescription">
                      <i class="fas fa-edit"></i>Add description
                    </li>
                    <li @click="isHiddenClientInfo = !isHiddenClientInfo">
                      <i class="fal fa-user"></i>Add client info
                    </li>

                    <li @click="isHiddenPaymentInfo = !isHiddenPaymentInfo">
                      <i class="fas fa-dollar-sign"></i>Enter Payment
                    </li>
                    <v-col v-if="!isHiddenPaymentInfo">
                      <label class="form-label-outside">Payment</label>
                      <v-text-field
                        outlined
                        placeholder="Enter payment amount"
                        class="form-control"
                        v-model="invoiceAllDetails.invoicePayment"
                        required
                        hide-details="auto"
                      ></v-text-field>
                    </v-col>
                  </v-form>
                </ul>
              </div>
              <hr />
              <div class="addpayment-line-wrapper">
                <ul>
                  <v-dialog v-model="getlink" width="470">
                    <template v-slot:activator="{ on, attrs }">
                      <li v-bind="attrs" v-on="on">
                        <i class="fa fa-map-marker"></i>Get Link
                      </li>
                    </template>
                    <v-card class="getlink-modalwrapper">
                      <v-card-text>
                        <p>
                          The link will be available once the invoice is saved
                          for the first time
                        </p>
                        <v-btn color="primary" text @click="getlink = false">
                          Ok
                        </v-btn>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="copyinvoice" width="420">
                    <template v-slot:activator="{ on, attrs }">
                      <li v-bind="attrs" v-on="on">
                        <i class="fas fa-copy"></i>Copy Invoice
                      </li>
                    </template>
                    <v-card class="getlink-modalwrapper">
                      <v-card-text>
                        <p>
                          Please save the invoice before attempting to make a
                          copy
                        </p>
                        <v-btn
                          color="primary"
                          text
                          @click="copyinvoice = false"
                        >
                          Ok
                        </v-btn>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="deleteinvoice" width="810">
                    <template v-slot:activator="{ on, attrs }">
                      <li
                        v-bind="attrs"
                        v-on="on"
                        class="delete-icon-innerwrapepr"
                      >
                        <i class="fas fa-ban"></i>Delete
                      </li>
                    </template>
                    <v-card class="delete-invoicemodal">
                      <v-card-title>
                        <span class="new-client-innerwrapper"
                          >Delete Invoice</span
                        >
                        <i
                          text
                          @click="deleteinvoice = false"
                          class="fa fa-times sender-modalwrapper-closebtn"
                          aria-hidden="true"
                        ></i>
                      </v-card-title>
                      <v-card-text>
                        <p>
                          Are you sure you want to delete this invoice? This can
                          not be undone.
                        </p>
                        <div class="delete-invoice-modalbtnwrapper">
                          <v-btn
                            @click="deleteinvoice = false"
                            class="delete-btnwrapper"
                          >
                            Delete Invoice
                          </v-btn>
                          <v-btn
                            @click="deleteinvoice = false"
                            class="cancel-btnwrapper"
                          >
                            Cancel
                          </v-btn>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="customField1" persistent max-width="350px">
                    <template v-slot:activator="{ on, attrs }">
                      <li v-bind="attrs" v-on="on">
                        <i class="fas fa-copy"></i>Custom Field 1
                      </li>
                    </template>
                    <v-card class="invoice-modalwrapper delete-invoicemodal">
                      <v-card-title>
                        <i
                          text
                          @click="customField1 = false"
                          class="fa fa-times sender-modalwrapper-closebtn"
                          aria-hidden="true"
                        ></i>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-form @click="onSubmitField1">
                            <v-row>
                              <v-col cols="12" lg="12">
                                <label class="form-label-outside"
                                  >Field Name</label
                                >
                                <v-text-field
                                  outlined
                                  class="form-control"
                                  v-model="customFieldOne.fieldName"
                                  hide-details="auto"
                                  :rules="globalRules"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" lg="12">
                                <label class="form-label-outside">Value</label>
                                <v-text-field
                                  outlined
                                  class="form-control"
                                  v-model="customFieldOne.fieldValue"
                                  hide-details="auto"
                                  :rules="globalRules"
                                >
                                </v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" lg="12">
                                <label class="form-label-outside"
                                  >Display Location</label
                                >
                                <v-select
                                  :items="displayLocation"
                                  v-model="customFieldOne.displayLocation"
                                  outlined
                                  item-text="name"
                                  item-value="id"
                                  hide-details="auto"
                                ></v-select>
                              </v-col>
                            </v-row>
                          </v-form>
                          <div
                            class="new-client-innerwrapper set-invoice-modal"
                          >
                            <v-btn @click="setCustomField1"> Submit </v-btn>
                          </div>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="customField2" persistent max-width="350px">
                    <template v-slot:activator="{ on, attrs }">
                      <li v-bind="attrs" v-on="on">
                        <i class="fas fa-copy"></i>Custom Field 2
                      </li>
                    </template>
                    <v-card class="invoice-modalwrapper delete-invoicemodal">
                      <v-card-title>
                        <i
                          text
                          @click="customField2 = false"
                          class="fa fa-times sender-modalwrapper-closebtn"
                          aria-hidden="true"
                        ></i>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-form @click="onSubmitField2">
                            <v-row>
                              <v-col cols="12" lg="12">
                                <label class="form-label-outside"
                                  >Field Name</label
                                >
                                <v-text-field
                                  outlined
                                  class="form-control"
                                  v-model="customFieldTwo.fieldName"
                                  hide-details="auto"
                                  :rules="globalRules"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" lg="12">
                                <label class="form-label-outside">Value</label>
                                <v-text-field
                                  outlined
                                  class="form-control"
                                  v-model="customFieldTwo.fieldValue"
                                  hide-details="auto"
                                  :rules="globalRules"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" lg="12">
                                <label class="form-label-outside"
                                  >Display Location</label
                                >
                                <v-select
                                  :items="displayLocation"
                                  v-model="customFieldTwo.displayLocation"
                                  outlined
                                  item-text="name"
                                  item-value="id"
                                  hide-details="auto"
                                ></v-select>
                              </v-col>
                            </v-row>
                          </v-form>
                          <div
                            class="new-client-innerwrapper set-invoice-modal"
                          >
                            <v-btn @click="setCustomField2"> Submit </v-btn>
                          </div>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="customField3" persistent max-width="350px">
                    <template v-slot:activator="{ on, attrs }">
                      <li v-bind="attrs" v-on="on">
                        <i class="fas fa-copy"></i>Custom Field 3
                      </li>
                    </template>
                    <v-card class="invoice-modalwrapper delete-invoicemodal">
                      <v-card-title>
                        <i
                          text
                          @click="customField3 = false"
                          class="fa fa-times sender-modalwrapper-closebtn"
                          aria-hidden="true"
                        ></i>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-form @click="onSubmitField3">
                            <v-row>
                              <v-col cols="12" lg="12">
                                <label class="form-label-outside"
                                  >Field Name</label
                                >
                                <v-text-field
                                  outlined
                                  class="form-control"
                                  v-model="customFieldThree.fieldName"
                                  hide-details="auto"
                                  :rules="globalRules"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" lg="12">
                                <label class="form-label-outside">Value</label>
                                <v-text-field
                                  outlined
                                  class="form-control"
                                  v-model="customFieldThree.fieldValue"
                                  hide-details="auto"
                                  :rules="globalRules"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" lg="12">
                                <label class="form-label-outside"
                                  >Display Location</label
                                >
                                <v-select
                                  :items="displayLocation"
                                  v-model="customFieldThree.displayLocation"
                                  outlined
                                  item-text="name"
                                  item-value="id"
                                  hide-details="auto"
                                ></v-select>
                              </v-col>
                            </v-row>
                          </v-form>
                          <div
                            class="new-client-innerwrapper set-invoice-modal"
                          >
                            <v-btn @click="setCustomField3"> Submit </v-btn>
                          </div>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </ul>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
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
import "firebase/firestore";
import currencyJson from "../data/currencies.json";
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

export default {
  currencyJson: currencyJson,
  name: "RegisterAdmin",
  components: {
    HelloWorld,
    VueCtkDateTimePicker,
  },
  filters: {
    currency(value) {
      return value.toFixed(2);
    },
  },
  methods: {
    addRow() {
      this.items.push({ description: "", quantity: 1, price: 0 });
      console.log("12", this.items);
    },
    chooseImage() {
      this.$refs.fileInput.click();
    },
    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    },
    printInvoice: function () {
      window.print();
    },
    addNewItem: function () {
      this.items.push({
        description: "Item name",
        quantity: 0,
        rate: 0,
      });
    },
    onFormSubmit() {
      var db = firebase.firestore();
      db.collection("invoiceSenderViews")
        .add(this.invoiceSenderView)
        .then(() => {
          this.dialogSender = false;
          alert("Sender details send successfully!");
          this.invoiceSenderView.senderName = "";
          this.invoiceSenderView.senderCountry = "";
          this.invoiceSenderView.senderFirstName = "";
          this.invoiceSenderView.senderLastName = "";
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

    onFormSubmitClient() {
      var db = firebase.firestore();
      db.collection("invoiceClientViews")
        .add(this.invoiceClientView)
        .then(() => {
          this.dialogRecipient = false;
          alert("Client details send successfully!");
          this.invoiceClientView.clientCompanyName = "";
          this.invoiceClientView.clientFirstName = "";
          this.invoiceClientView.clientLastName = "";
          this.invoiceClientView.clientEmail = "";
          this.invoiceClientView.clientCountry = "";
          this.invoiceClientView.clientAddress1 = "";
          this.invoiceClientView.clientAddress2 = "";
          this.invoiceClientView.clientPhone = "";
          this.invoiceClientView.clientExtraData = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSubmitPayment() {
      var db = firebase.firestore();
      db.collection("paymentOverviews")
        .add(this.paymentOverview)
        .then(() => {
          this.addPaymentDetails = false;
          alert("Payment details added successfully!");
          this.paymentOverview.paymentType = "";
          this.paymentOverview.paymentDetails = "";
          this.paymentOverview.displayLocation = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSubmitField1() {
      var db = firebase.firestore();
      db.collection("customFieldsOne")
        .add(this.customFieldOne)
        .then(() => {
          this.customField1 = false;
          alert("Field added successfully!");
          this.customFieldOne.fieldName = "";
          this.customFieldOne.fieldValue = "";
          this.customFieldOne.displayLocation = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSubmitField2() {
      var db = firebase.firestore();
      db.collection("customFieldsTwo")
        .add(this.customFieldTwo)
        .then(() => {
          this.customField2 = false;
          alert("Field added successfully!");
          this.customFieldTwo.fieldName = "";
          this.customFieldTwo.fieldValue = "";
          this.customFieldTwo.displayLocation = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSubmitField3() {
      var db = firebase.firestore();
      db.collection("customFieldsThree")
        .add(this.customFieldThree)
        .then(() => {
          this.customField3 = false;
          alert("Field added successfully!");
          this.customFieldThree.fieldName = "";
          this.customFieldThree.fieldValue = "";
          this.customFieldThree.displayLocation = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSubmitInvoice() {
      var db = firebase.firestore();
      db.collection("invoiceTypes")
        .add(this.InvoiceTypeView)
        .then(() => {
          this.InvoiceDialog = false;
          alert("Invoice added successfully!");
          this.InvoiceTypeView.invoiceType = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSubmitAllDetails() {
      // const formData = new FormData();
      // formData.append("invoiceLogo", this.invoiceAllDetails.invoiceLogo);
      var db = firebase.firestore();
      db.collection("invoiceUniversalData")
        .add(this.invoiceAllDetails)
        .then(() => {
          alert("Invoice data submitted successfully!");
          this.invoiceAllDetails.invoicePayment = "";
          this.invoiceAllDetails.companyInfo = "";
          this.invoiceAllDetails.clientInfo = "";
          this.invoiceAllDetails.invoiceDescription = "";
          this.invoiceAllDetails.defaultTemplete = "";
          this.invoiceAllDetails.invoiceNumber = "";
          this.invoiceAllDetails.invoiceDate = "";
          this.invoiceAllDetails.dueDate = "";
          this.invoiceAllDetails.currencySymbol = "";
          // this.invoiceAllDetails.invoiceLogo = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // handleFileUpload(e) {
    //   console.log(e);
    // },
    saveInvoiceData() {
      this.onSubmitAllDetails();
    },
    setSender() {
      const check = this.$refs.sender_form.validate();
      if (check) {
        this.onFormSubmit();
      }
    },
    setPaymentDetails() {
      this.onSubmitPayment();
    },
    setCustomField1() {
      this.onSubmitField1();
    },
    setCustomField2() {
      this.onSubmitField2();
    },
    setCustomField3() {
      this.onSubmitField3();
    },
    setInvoiceType() {
      this.onSubmitInvoice();
    },

    setClient() {
      const check = this.$refs.client_form.validate();
      if (check) {
        this.onFormSubmitClient();
      }
    },
  },
  created() {
    var db = firebase.firestore();
    db.collection("invoiceSenderViews").onSnapshot((snapshotChange) => {
      this.Users = [];
      snapshotChange.forEach((doc) => {
        this.Users.push({
          key: doc.id,
          senderName: doc.data().senderName,
          senderCountry: doc.data().senderCountry,
          senderFirstName: doc.data().senderFirstName,
          senderLastName: doc.data().senderLastName,
          senderTaxNumber: doc.data().senderTaxNumber,
          senderEmail: doc.data().senderEmail,
          senderAddress1: doc.data().senderAddress1,
          senderAddress2: doc.data().senderAddress2,
          senderPhone: doc.data().senderPhone,
          senderWebsite: doc.data().senderWebsite,
        });
        // console.log("ww", this.Users);
      });
    });

    db.collection("invoiceClientViews").onSnapshot((snapshotChange) => {
      this.ClientUsers = [];
      snapshotChange.forEach((doc) => {
        this.ClientUsers.push({
          key: doc.id,
          clientCompanyName: doc.data().clientCompanyName,
          clientFirstName: doc.data().clientFirstName,
          clientLastName: doc.data().clientLastName,
          clientEmail: doc.data().clientEmail,
          clientCountry: doc.data().clientCountry,
          clientAddress1: doc.data().clientAddress1,
          clientAddress2: doc.data().clientAddress2,
          clientPhone: doc.data().clientPhone,
          clientExtraData: doc.data().clientExtraData,
        });
      });
    });
    db.collection("paymentOverviews").onSnapshot((snapshotChange) => {
      this.PaymentDetailsOverview = [];
      snapshotChange.forEach((doc) => {
        this.PaymentDetailsOverview.push({
          key: doc.id,
          paymentType: doc.data().paymentType,
          paymentDetails: doc.data().paymentDetails,
        });
      });
    });
    db.collection("invoiceTypes").onSnapshot((snapshotChange) => {
      this.InvoiceDetailsOverview = [];
      snapshotChange.forEach((doc) => {
        this.InvoiceDetailsOverview.push({
          key: doc.id,
          invoiceType: doc.data().invoiceType,
        });
      });
    });
  },
  computed: {
    total() {
      return this.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
  },
  data: () => ({
    invoiceDate: null,
    dueDate: null,
    countryCurrencySymbol: {
      currencies: [],
    },
    currencies: [],
    isHiddenCompanyInfo: true,
    isHiddenClientInfo: true,
    isHiddenDescription: true,
    isHiddenPaymentInfo: true,
    imageData: null,
    getlink: false,
    addPaymentDetails: false,
    customField1: false,
    customField2: false,
    customField3: false,
    copyinvoice: false,
    ClientUsers: [],
    PaymentDetailsOverview: [],
    InvoiceDetailsOverview: [],
    InvoiceTypeOverview: [],
    Users: [],
    nameRules: [
      (v) => !!v || "Please complete this mandatory field.",
      (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
    ],
    globalRules: [
      (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
    ],
    globalRulesAddress: [
      (v) =>
        (v && v.length <= 200) || "Address must be less than 200 characters",
    ],
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
    countryRules: [(v) => !!v || "Please complete this mandatory field."],

    invoiceSenderView: {},
    paymentOverview: {
      paymentType: "",
      paymentDetails: "",
      displayLocation: "",
    },
    customFieldOne: {
      fieldName: "",
      fieldValue: "",
      displayLocation: "",
    },
    customFieldTwo: {
      fieldName: "",
      fieldValue: "",
      displayLocation: "",
    },
    customFieldThree: {
      fieldName: "",
      fieldValue: "",
      displayLocation: "",
    },
    InvoiceTypeView: {
      invoiceType: "",
    },
    invoiceAllDetails: {
      invoicePayment: "",
      companyInfo: "",
      clientInfo: "",
      invoiceDescription: "",
      defaultTemplete: "",
      invoiceNumber: "",
      invoiceDate: "",
      dueDate: "",
      currencySymbol: "",
      // invoiceLogo: "",
    },
    invoiceType: [
      {
        id: "Invoice",
        name: "Invoice",
      },
      {
        id: "Tax Invoice",
        name: "Tax Invoice",
      },
      {
        id: "Commercial Invoice",
        name: "Commercial Invoice",
      },
      {
        id: "Proforma Invoice",
        name: "Proforma Invoice",
      },
      {
        id: "Bill",
        name: "Bill",
      },
      {
        id: "Receipt",
        name: "Receipt",
      },
      {
        id: "Purchase Order",
        name: "Purchase Order",
      },
      {
        id: "Quote",
        name: "Quote",
      },
      {
        id: "Estimate",
        name: "Estimate",
      },
    ],
    displayLocation: [
      {
        id: "Sender",
        name: "Sender",
      },
      {
        id: "Receiver",
        name: "Receiver",
      },
      {
        id: "Description",
        name: "Description",
      },
      {
        id: "Terms",
        name: "Terms",
      },
    ],
    invoiceClientView: {},
    items: [
      { description: "Website design", quantity: 1, price: 300 },
      { description: "Website design", quantity: 1, price: 75 },
      { description: "Website design", quantity: 1, price: 10 },
    ],
    item: [],
    dialogSender: false,
    deleteinvoice: false,
    fadeone: false,
    dialogRecipient: false,
    InvoiceDialog: false,

    invoice: ["Invoice"],
    templates: [
      ["Blank Template"],
      ["Web-Developer Template"],
      ["Marketing Template"],
      ["Travel Agency Template"],
      ["Consulting Agency Template"],
      ["Designer & Creative Agency Template"],
      ["Training, Tutoring & Education Organization Template"],
      ["Copy Writing & Content Template"],
      ["IT Service Template"],
      ["Video production Template"],
      ["Audio production Template"],
      ["Analyst Template"],
      ["Virtual Assistance Template"],
      ["Data Specialist Template"],
      ["Photography & Filming Template"],
      ["Developer Template"],
      ["UK VAT"],
      ["UK No VAT"],
      ["Japan CT"],
      ["Japan No CT"],
      ["Australia GST"],
      ["Australia No GST"],
      ["New Zealand GST"],
      ["New Zealand No GST"],
      ["Canada GST"],
      ["Canada No GST"],
      ["Philippines VAT"],
      ["Philippines No VAT"],
      ["India GST"],
      ["India No GST"],
      ["Germany VAT"],
      ["Germany No VAT"],
      ["Ireland VAT"],
      ["Ireland No VAT"],
      ["Pakistan ST"],
      ["Pakistan No ST"],
    ],
  }),
  mounted() {
    this.currencies = currencyJson;
  },
};
</script>
<style scoped>
.background_color {
  width: 100%;
  background: #f6f5f9;
}
.invoice-box .v-text-field--outlined > .v-input__control > .v-input__slot {
  min-height: 40px !important;
}
.sender-modal-mainwrapper
  .v-text-field--outlined
  > .v-input__control
  > .v-input__slot {
  min-height: 45px !important;
  border-color: 1px solid #dbdff3 !important;
  border-radius: 3px !important;
}
.currency-symbol-mainwrapper
  .v-text-field--outlined
  > .v-input__control
  > .v-input__slot {
  min-height: 30px !important;
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
  top: 22px;
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
.due-date-calanderwrapper {
  height: 50px !important;
  width: 120px;
  display: flex;
  justify-content: center;
  padding: 0px;
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
  width: 100px;
  height: 20px;
  display: flex;
  align-items: center;
}
.invoice-contentwrapper span {
  font-size: 12px;
}
.invoice-mainwrapper h4 {
  font-size: 14px;
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
  outline: 3px solid #257eff;
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
  padding: 20px 30px !important;
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
  vertical-align: top;
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

.invoice-box table tr.heading td {
  font-size: 14px;
  /* padding: 8px 10px; */
  font-weight: bold;
  background: #f5f5f5;
  text-align: left;
}
.invoice-box table tr.heading {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
.invoice-box table tr.details td {
  padding-bottom: 20px;
}
.invoice-box table tr.item td {
  border-bottom: 1px solid #eee;
  text-align: left;
  font-size: 14px;
}
.invoice-box table tr.item input {
  padding-left: 5px;
}
.invoice-box table tr.total td:nth-child(2) {
  border-top: 2px solid #eee;
  font-weight: bold;
}

.invoice-box input[type="number"] {
  width: 60px;
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
</style>

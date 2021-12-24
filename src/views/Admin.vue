<template>
  <section>
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <HelloWorld msg="Welcome" />
        <h1>Admin</h1>
        <p v-if="user">User: {{ user.email }}</p>
        <v-card class="mx-auto" max-width="500">
          <v-toolbar color="indigo" dark>
            <v-toolbar-title>Dashboard</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-actions>
            <v-btn text color="teal accent-4" @click="signout"> Signout </v-btn>
          </v-card-actions>
          <v-container fluid>
            <v-row dense>
              <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
                <v-card>
                  <v-img
                    :src="card.src"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                  >
                    <v-card-title v-text="card.title"></v-card-title>
                  </v-img>

                  <!-- <div v-for="user in users" :key="user.id"></div>
                  <div data-label="Name">{{ user.email }}</div>
                  <div>
                    <select @change="changeRole(user.id, $event)">
                      <option
                        :selected="user.role.subscriber"
                        value="subscriber"
                      >
                        Subscriber
                      </option>
                      <option :selected="user.role.customer" value="customer">
                        Customer
                      </option>
                    </select>
                  </div> -->
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>mdi-bookmark</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>mdi-share-variant</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </div>
    </div>
  </section>
</template>

<script>
import * as firebase from "firebase/app";
import HelloWorld from "@/components/HelloWorld.vue";
import "firebase/auth";
// import "firebase/functions";

export default {
  components: {
    HelloWorld,
  },
  name: "Admin",
  data() {
    return {
      users: [],
      user: null,
      email: "",
      password: "",
      cards: [
        {
          title: "Pre-fab homes",
          src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
          flex: 12,
        },
        {
          title: "Favorite road trips",
          src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          flex: 6,
        },
        {
          title: "Best airlines",
          src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
          flex: 6,
        },
      ],
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
          console.log("🌿", doc.data());
          if (!user.role.admin) this.users.push(user);
        });
      });
  },
  methods: {
    signout() {
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
    changeRole(uid, event) {
      var setUserRole = firebase.functions().httpsCallable("setUserRole");
      var data = { uid: uid, role: { [event.target.value]: true } };
      setUserRole(data)
        .then((result) => {
          console.log("🎉", result);
        })
        .catch((error) => {
          console.log("🤡", error);
        });
    },
  },
};
</script>
<style scoped>
.theme--dark.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
  background-color: #1e6cd9;
}
</style>

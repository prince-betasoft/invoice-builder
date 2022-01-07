<template>
  <v-app>
    <UserDashboard msg="Login" />

    <v-main class="wrapper">
      <div>
        <div class="dashboard-sidebar-logo-wrapper"></div>
        <h3>Create your first invoice now</h3>

        <v-btn class="downlaod-btn">
          <router-link class="router-link-wrapper" to="/create-invoice">
            New Invoice</router-link
          ></v-btn
        >
      </div>
    </v-main>
  </v-app>
</template>

<script>
import UserDashboard from "@/views/dashboard.vue";

export default {
  components: {
    UserDashboard,
  },
  data() {
    return {
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
    };
  },
};
</script>
<style>
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
</style>

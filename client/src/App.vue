<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="nav-item nav-link" to="/home">
        <font-awesome-icon icon="home" />Home
      </router-link>
      <div class="navbar-nav mr-auto">
        <div v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link">Admin Board</router-link>
        </div>
        <div v-if="showModeratorBoard" class="nav-item">
          <router-link to="/mod" class="nav-link">Moderator Board</router-link>
        </div>
        <router-link class="nav-item nav-link" v-if="currentUser" to="/user">User</router-link>
        <router-link class="nav-item nav-link" v-if="currentUser" to="/blogs">Blog</router-link>
        <router-link class="nav-item nav-link" v-if="showAdminBoard" to="/add">Add</router-link>
      </div>

      <div class="navbar-nav ml-auto" v-if="!currentUser">
        <router-link class="nav-item nav-link" to="/register">
          <font-awesome-icon icon="user-plus" />Sign Up
        </router-link>
        <router-link class="nav-item nav-link" to="/login">
          <font-awesome-icon icon="sign-in-alt" />Sign In
        </router-link>
      </div>

      <div class="navbar-nav ml-auto" v-if="currentUser">
        <router-link class="nav-item nav-link" to="/profile">
          <font-awesome-icon icon="user" />
          {{currentUser.username}}
        </router-link>
        <a class="nav-item nav-link" @click.prevent="logOut">
          <font-awesome-icon icon="sign-out-alt" />Log Out
        </a>
      </div>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_MODERATOR");
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    }
  }
};
</script>

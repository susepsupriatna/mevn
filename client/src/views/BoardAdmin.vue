<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
    </header>
  </div>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>-->
</template>

<script>
import UserService from "../services/UserService";

export default {
  name: "Admin",
  data() {
    return {
      content: ""
    };
  },
  mounted() {
    UserService.getAdminBoard().then(
      res => {
        this.content = res.data;
      },
      error => {
        this.content =
          (error.res && error.res.data) || error.message || error.toString();
      }
    );
  }
};
// // @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// export default {
//   name: 'Home',
//   components: {
//     HelloWorld
//   }
// }
</script>

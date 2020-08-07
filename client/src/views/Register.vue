<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        id="profile-img"
        class="profie-img-card"
      />
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successfull">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              class="form-control"
              name="username"
              v-model="user.username"
              v-validate="'required|min:3|max:20'"
            />
            <div
              v-if=" submitted && errors.has('username')"
              class="alert alert-danger"
            >{{errors.first('username')}}</div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              class="form-control"
              name="email"
              v-model="user.email"
              v-validate="'required|email|max:50'"
            />
            <div
              v-if=" submitted && errors.has('email')"
              class="alert alert-danger"
            >{{errors.first('email')}}</div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              name="password"
              v-model="user.password"
              v-validate="'required'"
            />
            <div
              v-if=" submitted && errors.has('password')"
              class="alert alert-danger"
            >{{errors.first('password')}}</div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">Sign Up</button>
          </div>
        </div>
      </form>
      <div
        v-if="message"
        class="alert"
        :class="successfull ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
    </div>
  </div>
</template>

<script>
import User from "../model/user";
export default {
  name: "Register",
  data() {
    return {
      user: new User("", "", ""),
      submitted: false,
      successfull: false,
      message: ""
    };
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },

  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },

  methods: {
    handleRegister() {
      this.message = "";
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch("auth/register", this.user).then(
            data => {
              this.message = data.message;
              this.successfull = true;
            },
            error => {
              this.message =
                (error.res && error.res.data) ||
                error.message ||
                error.toString();
              this.successfull = false;
            }
          );
        }
      });
    }
  }
};
</script>
<style>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25p 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  border-radius: 2px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 100px;
  height: 100px;
  margin: 0 auto 10px;
  display: block;
}
</style>
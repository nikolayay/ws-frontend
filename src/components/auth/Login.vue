<template>
  <section class="container auth-form box">
    <b-field
      :type="{'is-danger': errors.has('email')}"
      :message="errors.first('email')"
      label="Email"
    >
      <b-input
        name="email"
        type="email"
        v-validate="'required|email'"
        placeholder="Your Email"
        v-model="email"
      ></b-input>
    </b-field>
    <b-field
      :type="{'is-danger': errors.has('password')}"
      :message="errors.first('password')"
      label="Password"
    >
      <b-input
        name="password"
        type="password"
        password-reveal
        v-validate="'required'"
        placeholder="Your Password"
        v-model="password"
      ></b-input>
    </b-field>
    <br>
    <a @click.prevent="login" class="button is-fullwidth is-primary">Log In</a>
    <small>
      Don`t have an account?
      <router-link to="/signup">Sign Up.</router-link>
    </small>
  </section>
</template>

<script>
import { LOGIN_MUTATION } from "@/graphql/mutations";
import Vue from "vue";
import VeeValidate from "vee-validate";
import { set } from "@/session";

Vue.use(VeeValidate, {
  events: ""
});

export default {
  name: "Login",
  title: `Login | ${process.env.VUE_APP_NAME}`,
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      const valid = await this.$validator.validateAll();

      if (valid) {
        this.$Progress.start();

        const res = await this.$apollo
          .mutate({
            mutation: LOGIN_MUTATION,
            variables: { email: this.email, password: this.password }
          })
          .catch(({ message }) => {
            this.$Progress.fail();
            this.$toast.open({
              message,
              type: "is-danger",
              position: "is-bottom"
            });
          });

        if (res) {
          this.$Progress.finish();

          this.$session.set("jwt", res.data.login.token);

          this.$toast.open({
            message: "Login successful!",
            type: "is-success",
            position: "is-bottom",
            duration: 5000
          });
          this.$router.replace("/");
        }
      }
    }
  }
};
</script>

<style scoped>
.auth-form {
  max-width: 300px;
}
a.button {
  margin-bottom: 5px;
}
</style>

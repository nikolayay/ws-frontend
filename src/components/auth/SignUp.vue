<template>
  <section class="container auth-form box">
    <b-field :type="{'is-danger': errors.has('name')}" :message="errors.first('name')" label="Name">
      <b-input
        name="name"
        type="name"
        v-validate="'required|alpha_spaces'"
        placeholder="Your Name"
        v-model="name"
      ></b-input>
    </b-field>
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

    <sign-up-demographics :wizard-data="demographics"/>

    <br>
    <a @click.prevent="signup" class="button is-fullwidth is-primary">Sign Up</a>
    <small>
      Already have an account?
      <router-link to="/login">Log In.</router-link>
    </small>
  </section>
</template>

<script>
import { SIGNUP_MUTATION } from "@/graphql/mutations";
import SignUpDemographics from "@/components/auth/SignUpDemographics";
import Vue from "vue";
import VeeValidate from "vee-validate";
import { set } from "@/session";
console.log(set);

Vue.use(VeeValidate, {
  events: ""
});

export default {
  name: "SignUp",
  components: { SignUpDemographics },
  title: `Sign Up | ${process.env.VUE_APP_NAME}`,
  data() {
    return {
      name: "",
      email: "",
      password: "",
      demographics: {
        dob: null,
        gender: null,
        ethnicity: null
      }
    };
  },
  methods: {
    async signup() {
      const valid = await this.$validator.validateAll();
      if (valid) {
        this.$Progress.start();
        const res = await this.$apollo
          .mutate({
            mutation: SIGNUP_MUTATION,
            variables: {
              name: this.name,
              email: this.email,
              password: this.password,
              ...this.demographics
            }
          })
          .catch(({ message }) => {
            this.$Progress.fail();
            this.$toast.open({
              message,
              type: "is-danger",
              position: "is-bottom",
              duration: 5000
            });
          });

        if (res) {
          this.$Progress.finish();
          set(res.data.signup.token);
          this.$toast.open({
            message: "Sign up successful!",
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

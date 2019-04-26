<template>
  <div class="section">
    <SignUp/>
  </div>
</template>

<script>
// @ is an alias to /src
import SignUp from "@/components/auth/SignUp.vue";

export default {
  name: "signup",
  components: {
    SignUp
  }
};
</script>

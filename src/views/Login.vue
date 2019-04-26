<template>
  <div class="section">
    <Login/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/auth/Login";

export default {
  name: "login",
  components: {
    Login
  }
};
</script>

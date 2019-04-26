<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link title="Home" class="navbar-item" exact to="/">
          <img src="@/assets/logo.png">
        </router-link>
        <a
          @click="toggleDropdown"
          v-bind:class="{'is-active': this.dropDownActive}"
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        v-bind:class="{'is-active': this.dropDownActive}"
        id="navbarBasicExample"
        class="navbar-menu"
      >
        <div class="navbar-start">
          <template v-if="isAuthenticated">
            <router-link title="Home" class="navbar-item" exact to="/">Home</router-link>
            <router-link title="Research" class="navbar-item" exact to="/research">Research</router-link>
          </template>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link
                title="Add a new scar"
                exact
                to="/create-entry"
                v-if="isAuthenticated"
                class="button is-white"
              >
                <b-icon icon="plus"></b-icon>
                <p class="control">New scar</p>
              </router-link>
              <a
                title="Log Out"
                v-if="isAuthenticated"
                @click.prevent="logout"
                class="button is-white"
              >Log Out</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { get, remove } from "@/session";
export default {
  data() {
    return {
      isAuthenticated: !!get("jwt"),
      dropDownActive: false
    };
  },
  methods: {
    logout() {
      remove("jwt");
      this.$router.replace("/login");
    },
    toggleDropdown() {
      this.dropDownActive = !this.dropDownActive;
    }
  }
};
</script>

<style scoped>
.buttons {
  display: flex;
  justify-content: space-between;
}
</style>

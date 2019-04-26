<template>
  <main>
    <Nav/>
    <b-loading :is-full-page="false" :active.sync="$apollo.loading" :can-cancel="false"></b-loading>
    <div :class="{container: !noContainer}" class="page">
      <slot></slot>
    </div>
  </main>
</template>

<script>
import Nav from "@/components/ui/Nav";

export default {
  components: { Nav },
  props: {
    noContainer: Boolean
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.page {
  margin-top: 15px;
}
.container {
  padding: 8px;
}
</style>

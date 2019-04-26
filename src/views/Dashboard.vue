<template>
  <page>
    <div>
      <b-loading :is-full-page="true" :active.sync="$apollo.queries.me.loading" :can-cancel="false"></b-loading>
      <h1 class="title has-text-centered">Scar Dashboard</h1>
      <h3 class="subtitle has-text-centered">{{dashboardDescription}}</h3>
    </div>
    <br>
    <div class="dashboard">
      <scar-card :key="scar.id" :scar="scar" v-for="scar in me.scars"></scar-card>
      <div>
        <h3 v-if="noScars" class="nothing subtitle">Nothing here. 😦</h3>
      </div>
    </div>
  </page>
</template>

<script>
import ScarCard from "@/components/ScarCard";
import Page from "@/components/ui/Page";
import { ME_QUERY } from "@/graphql/queries";

export default {
  name: "Home",
  title: `Home | ${process.env.VUE_APP_NAME}`,
  data() {
    return {
      me: ""
    };
  },
  apollo: {
    me: {
      query: ME_QUERY
    }
  },
  components: {
    ScarCard,
    Page
  },
  mounted() {
    this.$apollo.queries.me.refetch();
  },
  computed: {
    noScars() {
      return this.me.scars && this.me.scars.length === 0;
    },
    dashboardDescription() {
      return `This page ${
        this.noScars ? "will contain" : "contains"
      } all of the scars you have submitted. 
        ${this.noScars ? "" : "Click on a Scar Card for more detailed data."}`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dashboard {
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
.nothing {
  color: gray;
  opacity: 70%;
}
</style>

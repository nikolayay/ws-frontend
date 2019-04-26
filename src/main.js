import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import titleMixin from "./mixins/titleMixin";

Vue.mixin(titleMixin);

// CSS framework
import VueProgressBar from "vue-progressbar";
import Buefy from "buefy";
Vue.use(Buefy);

require("./assets/main.scss");

// Apollo
import VueApollo from "vue-apollo";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

// HTTP connect to api to the API
const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://my-project-backend.now.sh/graphql"
      : process.env.VUE_APP_API
});

// SESSION
import VueSession from "vue-session";
Vue.use(VueSession, { persist: true });
import { get } from "./session";

const httpLinkAuth = setContext((_, { headers }) => {
  const t = get();

  return {
    headers: {
      ...headers,
      Authorization: t ? `Bearer ${t}` : ""
    }
  };
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLinkAuth.concat(httpLink),
  cache: new InMemoryCache()
});

Vue.use(VueProgressBar);
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.config.productionTip = false;
Vue.prototype.$vueEventBus = new Vue();

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");

import Vue from "vue";
const vue = new Vue();
export function get() {
  return vue.$session.get("jwt");
}

export function set(token) {
  vue.$session.set("jwt", token);
}

export function remove(key) {
  vue.$session.remove(key);
}

export default {
  props: {
    wizardData: {
      type: Object,
      required: true
    }
  },

  updated() {
    Object.assign(this.wizardData, this.form);
  }
};

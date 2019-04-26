<template>
  <form-wizard
    title="Information about your scar"
    subtitle="Please complete the fields below"
    @on-complete="submitEntry"
    color="#ca0000"
  >
    <tab-content class="container" title="Information about your scar">
      <create-entry-stepper-scar-info :wizard-data="form.scarInfo"></create-entry-stepper-scar-info>
    </tab-content>
    <tab-content class="container" ref="posasTab" title="Self Assessment">
      <create-entry-stepper-posas :wizard-data="form.posas"></create-entry-stepper-posas>
    </tab-content>
    <tab-content class="container" title="Provide an Image">
      <create-entry-stepper-image-upload :wizard-data="form"></create-entry-stepper-image-upload>
    </tab-content>

    <template slot="footer" slot-scope="props">
      <div class="container" v-show="props.activeTabIndex !== 1">
        <wizard-button
          @click.native="props.prevTab()"
          v-if="props.activeTabIndex > 0"
          :style="props.fillButtonStyle"
          class="wizard-footer-left"
        >Back</wizard-button>

        <div class="wizard-footer-right">
          <wizard-button
            v-if="!props.isLastStep"
            @click.native="props.nextTab()"
            :style="props.fillButtonStyle"
          >Next</wizard-button>

          <wizard-button
            v-else
            @click.native="submitEntry"
            :style="props.fillButtonStyle"
          >{{props.isLastStep ? 'Done' : 'Next'}}</wizard-button>
        </div>
      </div>
    </template>
  </form-wizard>
</template>

<script>
import { FormWizard, TabContent, WizardButton } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import CreateEntryStepperPosas from "@/components/wizard/CreateEntryStepperPosas";
import CreateEntryStepperImageUpload from "@/components/wizard/CreateEntryStepperImageUpload";
import CreateEntryStepperScarInfo from "@/components/wizard/CreateEntryStepperScarInfo";
import { CREATE_SCAR_MUTATION } from "@/graphql/mutations";
import { ME_QUERY } from "@/graphql/queries";

export default {
  components: {
    FormWizard,
    TabContent,
    WizardButton,
    CreateEntryStepperPosas,
    CreateEntryStepperImageUpload,
    CreateEntryStepperScarInfo
  },

  data: () => {
    return {
      me: {},
      form: {
        posas: {
          posas_q1: null,
          posas_q2: null,
          posas_q3: null,
          posas_q4: null,
          posas_q5: null,
          posas_q6: null,
          posas_q7: null
        },
        scarInfo: {
          prevTreatment: "No",
          scarDate: null,
          causes: null,
          selected: null,
          conditions: null
        },
        image: null
      }
    };
  },

  apollo: {
    me: {
      query: ME_QUERY
    }
  },

  computed: {
    bodySiteSubmission() {
      const selected = this.form.scarInfo.selected;
      return selected ? selected.map(el => el.id) : [];
    },
    prevTreatmentSubmission() {
      return this.form.scarInfo.prevTreatment === "Yes" ? true : false;
    },
    posasScoreSubmission() {
      return parseInt(
        Object.values(this.form.posas).reduce((curr, prev) => curr + prev, 0)
      );
    }
  },

  methods: {
    async submitEntry() {
      this.$Progress.start();

      // create news scar
      await this.$apollo
        .mutate({
          mutation: CREATE_SCAR_MUTATION,
          variables: {
            ...this.form.scarInfo,
            prevTreatment: this.prevTreatmentSubmission,
            bodySites: this.bodySiteSubmission,
            image: this.form.image,
            date: new Date(this.form.scarInfo.scarDate),
            addedAt: new Date(),
            posasScore: this.posasScoreSubmission
          }
        })
        .then(() => {
          this.$Progress.finish();
          this.$toast.open({
            message: "New entry added successfully!",
            type: "is-success",
            position: "is-bottom",
            duration: 7000

          });

          // redirect
          this.$router.replace("/");
        })
        .catch(() => {
          this.$Progress.fail();
          this.$toast.open({
            message: "Please fill out all fields.",
            type: "is-danger",
            position: "is-bottom",
            duration: 7000
          });
        });
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 8px;
}
</style>

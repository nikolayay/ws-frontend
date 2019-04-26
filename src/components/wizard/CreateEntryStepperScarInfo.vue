<template>
  <div>
    <b-field horizontal label="Where is the scar on your body?">
      <b-field>
        <a @click="isModalActive = true" class="button is-fullwidth">{{bodySiteText}}</a>
        <p class="control">
          <button
            title="More info on the position of the scar"
            @click="showInfo('bodysite')"
            class="button is-primary"
          >
            <b-icon size="is-small" icon="information"></b-icon>
          </button>
        </p>
      </b-field>
    </b-field>

    <b-field horizontal label="When did you first notice the scar?">
      <b-field>
        <b-datepicker
          :max-date="new Date()"
          expanded
          v-model="form.scarDate"
          placeholder="Select the day when scar was recieved"
          icon="calendar-today"
        ></b-datepicker>
        <p class="control">
          <button
            title="More info on how to judge the date of injury"
            @click="showInfo('date')"
            class="button is-primary"
          >
            <b-icon size="is-small" icon="information"></b-icon>
          </button>
        </p>
      </b-field>
    </b-field>

    <b-field horizontal label="Have you recieved any previous treatment?">
      <b-switch
        v-model="form.prevTreatment"
        true-value="Yes"
        false-value="No"
      >{{ form.prevTreatment }}</b-switch>
    </b-field>

    <b-field horizontal label="Do you suffer from any of the following?">
      <b-select multiple v-model="form.conditions" expanded placeholder="Select all that apply">
        <option disabled>Select all that apply</option>
        <option>Arnold-Chiari malformations</option>
        <option>Anxiety</option>
        <option>Autoiommune disease</option>
        <option>Cardiovascular Risks</option>
        <option>Cutaneous Allodynia</option>
        <option>Depression</option>
        <option>Diabetes</option>
        <option>Dystonia</option>
        <option>Fibromyalgia</option>
        <option>Hemicrania continua</option>
        <option>Idiopathic Intracranial Hypertension</option>
        <option>Lupus</option>
        <option>Raynaud’s</option>
        <option>Seizures</option>
        <option>Sjogren’s syndrome</option>
        <option>Thyroid dysfunction</option>
        <option>Trigeminal neuralgia</option>
      </b-select>
    </b-field>

    <b-field horizontal label="Cause of Scar">
      <b-select multiple v-model="form.causes" expanded placeholder="Select all that apply">
        <option disabled>Select all that apply</option>
        <option>Surgery</option>,
        <option>Accident</option>,
        <option>Acne</option>,
        <option>Body piercings</option>,
        <option>Chickenpox</option>,
        <option>Certain insect or other bites</option>,
        <option>Wound</option>,
        <option>Wound infection</option>,
        <option>Wound closure</option>,
        <option>Traumatic skin injuries</option>
      </b-select>
    </b-field>

    <b-modal :active.sync="isModalActive" has-modal-card>
      <body-site-modal :form="form"></body-site-modal>
    </b-modal>
  </div>
</template>

<script>
import BodySiteModal from "@/components/modals/BodySiteModal";
import formWizardMixin from "@/mixins/formWizardMixin";

export default {
  mixins: [formWizardMixin],
  components: { BodySiteModal },
  data: () => {
    return {
      isModalActive: false,
      form: {
        selected: [],
        prevTreatment: "No",
        scarDate: null,
        causes: [],
        conditions: []
      }
    };
  },
  computed: {
    bodySiteText() {
      return this.form.selected.length > 0
        ? `${this.form.selected.map(el => el.id).join(", ")}`
        : "Click here to select body site.";
    }
  },
  methods: {
    showInfo(category) {
      // _alert(category, this);
      switch (category) {
        case "bodysite": {
          this.$dialog.alert({
            title: "Info",
            message:
              "Scars behave differently across the surface of the body. \n Some sites seem to produce more angry scars than others.  It has been suggested that this could be due to our genetic make up or alternatively, simple tension within the skin that varies with position on the surface.  We are keen to help you compare your scar with other the general population and to help standardise the effect of the area of your body, we ask you to select the position of your scar(s).  To do this, click on this box.  It will take you to a picture of the front of the body and the front of the face.  Click on the area of the body where your scar is positioned.  If the scar spans more than one area, you can click two or more areas.  Your selection appears on the right of the screen.  If you make a mistake, simply click the area again and the area will no longer be selected.  Once you have finished, click the box marked 'close'.",
            confirmText: "OK"
          });
          break;
        }
        case "date": {
          this.$dialog.alert({
            title: "Info",
            message:
              "Most scars arise after trauma to the skin, for example, an operation or accident.  However, some scars arise with no obvious trauma.  Please enter the date of any injury to the skin which may have caused the scar or if there was no injury, the date on which you first noticed the scar.  You can enter the date directly or by clicking on the calendar option and selecting the correct day, month and year.",
            confirmText: "OK"
          });
          break;
        }
        default: {
          alert("oops");
          break;
        }
      }
    }
  }
};
</script>

<style scoped>
</style>

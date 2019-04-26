



<template>
  <div>
    <b-field label="About you">
      <b-datepicker
        :max-date="new Date()"
        v-model="form.dob"
        placeholder="Select date of birth"
        icon="calendar-today"
      ></b-datepicker>
    </b-field>

    <b-field>
      <b-select v-model="form.gender" expanded placeholder="Gender" icon="account">
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </b-select>
    </b-field>
    <b-field>
      <b-select v-model="form.ethnicity" expanded placeholder="Ethnicity" icon="earth">
        <optgroup label="White">
          <option>English / Welsh / Scottish / Northern Irish / British</option>
          <option>Irish</option>
          <option>Other</option>
        </optgroup>
        <optgroup label="Mixed / Multiple ethnic groups">
          <option>White and Black Caribbean</option>
          <option>White and Black African</option>
          <option>White and Asian</option>
          <option>Other</option>
        </optgroup>
        <optgroup label="Asian / Asian British">
          <option>Indian</option>
          <option>Pakistani</option>
          <option>Bangladeshi</option>
          <option>Chinese</option>
          <option>Other</option>
        </optgroup>
        <optgroup label="Black / African / Caribbean / Black British">
          <option>African</option>
          <option>Caribbean</option>
          <option>Other</option>
        </optgroup>
        <optgroup label="Other ethnic group">
          <option>Arab</option>
          <option>Other</option>
        </optgroup>
      </b-select>
    </b-field>
  </div>
</template>

<script>
import formWizardMixin from "@/mixins/formWizardMixin";

export default {
  mixins: [formWizardMixin],

  data: () => {
    return {
      form: {
        dob: null,
        ethnicity: null,
        gender: null
      }
    };
  }
};
</script>

<style scoped>
</style>
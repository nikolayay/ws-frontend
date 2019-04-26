<template>
  <page no-container>
    <create-entry-stepper></create-entry-stepper>
  </page>
</template>

<script>
import Page from "@/components/ui/Page";
import CreateEntryStepper from "@/components/wizard/CreateEntryStepper";
export default {
  components: { Page, CreateEntryStepper },
  title: `New Entry | ${process.env.VUE_APP_NAME}`,

  data: () => ({ steps: 3, step: undefined })
};
</script>

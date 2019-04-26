<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">
        <strong>Scar ID:</strong>
        {{props.id}}
      </p>
    </header>
    <section class="modal-card-body">
      <div class="info">
        <div>
          <strong>Cause(s):</strong>
          {{props.causes}}
        </div>

        <div>
          <strong>Body Site(s):</strong>
          {{props.bodySites}}
        </div>

        <div>
          <strong>Posas Score:</strong>
          {{props.posas}}
        </div>

        {{props.treatments}}
        <div>
          <strong>Date of injury:</strong>
          {{props.date}}
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">Close</button>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: null
    };
  },
  created() {
    const parentProps = this.$parent.props;
    this.props = parentProps;
  }
};
</script>

<style lang="scss" scoped>
.content {
  display: grid;
  grid-template-columns: auto auto;
  justify-items: start;

  .info {
    text-align: start;
  }

  .status {
    display: flex;
    justify-content: space-between;
  }
}

.modal-card {
  padding: 8px;
}
</style>
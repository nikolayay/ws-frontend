<template>
  <div @click="showInfo(scar)" class="card">
    <header class="card-header">
      <b-tag class="card-header-title status" :type="statusType" rounded>{{status}}</b-tag>
      <p class="card-header-title time">{{moment(scar.addedAt).fromNow()}}</p>
    </header>
    <div class="card-content">
      <div class="content">
        <div class="info">
          <div>
            <strong>Cause(s):</strong>
            {{causes}}
          </div>

          <div>
            <strong>Body Site(s):</strong>
            {{bodySites}}
          </div>

          <div>
            <strong>Posas Score:</strong>
            {{posas}}
          </div>
          <div>
            <strong>Date of injury:</strong>
            {{date}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Vue from "vue";
import ScarInfoModal from "./modals/ScarInfoModal.vue";

Vue.prototype.moment = moment;

export default {
  props: {
    scar: {
      type: Object,
      required: true
    }
  },

  components: {
    ScarInfoModal
  },

  computed: {
    causes() {
      return this.scar.causes.join(", ") || "not specified";
    },
    bodySites() {
      return this.scar.bodySites.join(", ") || "not specified";
    },
    posas() {
      return this.scar.posasScore || 0;
    },
    date() {
      return moment(this.scar.date).fromNow() || "not specified";
    },
    status() {
      return this.scar.processingStatus
        ? this.scar.processingStatus[0] +
            this.scar.processingStatus.toLowerCase().slice(1)
        : "Error";
    },
    treatments() {
      return this.scar.treatmetns || null;
    },
    statusType() {
      switch (this.status) {
        case "Success":
          return "is-primary";
        case "Processing":
          return "is-info";
        default:
          return "is-warning";
      }
    }
    
  },

  methods: {
    showInfo(scar) {
      const props = {
        id: scar.id,
        causes: this.causes,
        bodySites: this.bodySites,
        posas: this.posas,
        date: this.date,
        treatments: this.treatments
      };
      this.$modal.open({
        parent: this,
        component: ScarInfoModal,
        props,
        hasModalCard: true
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}

.card-header-title {
  flex-grow: 0;
  font-size: 13px;
}

.content {
  display: grid;
  grid-template-columns: auto auto;
  justify-items: start;

  .info {
    text-align: start;
  }
}


.status {
  margin-left: 4px;
}

.ball {
  width: 1rem;
  height: 1rem;
  margin-right: 5px;
  border-radius: 50%;
  border: 1px solid black;
}
</style>
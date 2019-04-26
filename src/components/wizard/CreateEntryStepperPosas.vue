<template>
  <div>
    <b-tabs expanded position="is-centered" size="is-small" v-model="activeQuestionTab">
      <b-tab-item
        :label="makeLabel(index)"
        :key="index"
        v-for="(questionData, index) in this.posasQuestions"
        class="slider"
        :title="`Go to the Question number ${index + 1}`"
      >
        <div class="slider-wrapper is-three mb-2">
          <button
            :disabled="activeQuestionTab == 0"
            @click="stepBackActiveQuestionTab"
            class="button is-primary is-outlined"
            title="Go to the previous question"
          >
            <b-icon icon="arrow-left" size="is-small"></b-icon>
            <span class="button-text">Back</span>
          </button>

          <span>
            <p class="subtitle is-6">
              {{questionData.question}}
              <a
                @click="isPosasInfoModalActive = true"
                :title="`More info on Question ${index + 1}`"
                class="is-primary"
              >
                <b-icon icon="information"></b-icon>
              </a>
            </p>
          </span>

          <button
            @click="stepForwardActiveQuestionTab"
            class="button is-primary is-outlined"
            title="Go to the next question"
          >
            <span class="button-text">Next</span>
            <b-icon icon="arrow-right" size="is-small"></b-icon>
          </button>
        </div>

        <b-modal :active.sync="isPosasInfoModalActive" has-modal-card>
          <posas-info-modal>{{questionData.info}}</posas-info-modal>
        </b-modal>

        <vue-slider
          :show="tabActive"
          @drag-start="handleDragStart"
          @drag-end="handleDragEnd"
          ref="slider"
          v-bind="sliderOptions"
          v-model="form[Object.keys(form)[index]]"
        ></vue-slider>

        <div class="slider-wrapper is-two">
          <div>
            <small>{{questionData.top_msg}}</small>
          </div>

          <div>
            <small>{{questionData.bot_msg}}</small>
          </div>
        </div>
      </b-tab-item>
      <b-tab-item label="Summary">
        <div class="slider-wrapper is-three">
          <button
            :disabled="activeQuestionTab == 0"
            @click="stepBackActiveQuestionTab"
            class="button is-primary is-outlined"
          >
            <b-icon icon="arrow-left" size="is-small"></b-icon>
          </button>
        </div>

        <!-- <div class="summary box">
          <p :key="index" v-for="(answer, index) in Object.values(form)">
            <strong>Q{{index + 1}}:</strong>
            {{answer}}
          </p>
        </div>-->
        <div class="total">
          <button @click="restartQuestionnare" class="button is-primary is-outlined">Restart</button>
          <div>
            <h2 class="subtitle">Your assessment total:</h2>
            <h1 class="title">{{posasTotal}}</h1>
          </div>
          <button @click="confirmQuestionnare" class="button is-primary">Confirm</button>
        </div>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
import vueSlider from "vue-slider-component";

import PosasInfoModal from "@/components/modals/PosasInfoModal";
import posasQuestions from "@/assets/posas.json";

const sliderStyle = {
  backgroundColor: "#ca0000",
  border: "3px solid #ca0000"
};

import formWizardMixin from "@/mixins/formWizardMixin";

Vue.use(VeeValidate);
export default {
  mixins: [formWizardMixin],
  components: {
    vueSlider,
    PosasInfoModal
  },

  data() {
    return {
      sliderOptions: {
        min: 0,
        max: 10,
        interval: 0.1,
        dotSize: 20,
        piecewise: true,
        sliderStyle: sliderStyle,
        processStyle: sliderStyle,
        tooltipStyle: sliderStyle,
        labelStyle: sliderStyle
      },
      form: {
        posas_q1: 0,
        posas_q2: 0,
        posas_q3: 0,
        posas_q4: 0,
        posas_q5: 0,
        posas_q6: 0,
        posas_q7: 0
      },
      isPosasInfoModalActive: false,
      posasQuestions,
      activeQuestionTab: 0
    };
  },

  methods: {
    restartQuestionnare() {
      Object.keys(this.form).map(key => (this.form[key] = 0));
      this.activeQuestionTab = 0;
    },
    confirmQuestionnare() {
      this.$parent.$parent.nextTab();
    },
    makeLabel(index) {
      const q = this.form["posas_q" + (index + 1)];
      return `Question ${index + 1} ${q ? "- " + q : ""}`;
    },
    handleDragStart(slider) {
      slider.tooltipStyle.fontSize = "30px";
      slider.refresh();
    },
    handleDragEnd(slider) {
      // make smaller
      slider.tooltipStyle.fontSize = null;
      slider.refresh();

      // // switch to next tab
      // setTimeout(() => {
      //   if (this.activeQuestionTab < this.posasQuestions.length) {
      //     this.activeQuestionTab++;
      //   }
      // }, 250);
    },
    stepBackActiveQuestionTab() {
      if (this.activeQuestionTab > 0) {
        this.activeQuestionTab--;
      }
    },
    stepForwardActiveQuestionTab() {
      if (this.activeQuestionTab < this.posasQuestions.length) {
        this.activeQuestionTab++;
      }
    },
    showInfoModal() {
      this.$modal.open({
        parent: this,
        component: PosasInfoModal,
        hasModalCard: false
      });
    }
  },
  // below is the workaround for fixing broken sliders inside the <tab-content>
  computed: {
    tabActive() {
      return this.$parent.active;
    },
    posasTotal() {
      return Object.values(this.form)
        .reduce((c, n) => c + n)
        .toFixed(1);
    }
  },
  watch: {
    tabActive() {
      this.$refs.slider.forEach(s => s.refresh());
    }
  }
};
</script>


<style scoped>
.slider-wrapper {
  display: grid;
  justify-items: center;
  justify-content: space-between;
  grid-gap: 10px;
}

.slider-wrapper.is-two {
  grid-template-columns: repeat(2, auto);
}

.slider-wrapper.is-three {
  grid-template-columns: repeat(3, auto);
}
.slider-process {
  color: red;
}
.tab-item {
  height: 160px !important;
}

.summary {
  max-width: 360px;
  display: flex;
  justify-content: space-evenly;
}

.scores-list {
  display: grid;
  grid-template-columns: auto auto;
}

.total {
  display: grid;
  align-items: center;
  justify-content: space-evenly;
  grid-template-columns: auto minmax(min-content, 300px) auto;
}

.mb-2 {
  margin-bottom: 45px;
}

.back-button {
  visibility: hidden;
}

.button-text {
  font-size: 12px;
}
</style>

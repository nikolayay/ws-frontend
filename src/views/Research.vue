<template>
  <page class="research">
    <div>
      <h1 class="title has-text-centered">Research (Demo)</h1>
      <h3 class="subtitle has-text-centered">
        This is a demo research component to show off how the data may be processed.
        In practice data visualisation will probably be performed on demand, utilising more powerful tools.
      </h3>
      <p>Click on each cause on the left for more detailed information about the subset.</p>
    </div>
    <br>
    <div class="columns">
      <div class="column">
        <canvas v-if="!$apollo.queries.countScarsByCause.loading" id="types-chart"></canvas>
        <div v-else>Loading...</div>
      </div>
      <div class="column">
        <div v-if="!$apollo.queries.scarsWithCause.loading">
          <canvas
            v-for="dataset in this.scarsWithCause"
            :key="dataset.title"
            :id="`scar-type-${dataset.title}`"
          ></canvas>
        </div>
        <div v-else>Loading...</div>
      </div>
    </div>
  </page>
</template>

<script>
import Page from "@/components/ui/Page";
import { COUNT_SCARS_BY_CAUSE, GET_SCARS_WITH_CAUSE } from "@/graphql/queries";
import Cart from "chart.js";
import palette from "google-palette";
import { setTimeout } from "timers";
import { release, totalmem } from "os";
import { toUnicode } from "punycode";

export default {
  name: "Research",
  title: `Research | ${process.env.VUE_APP_NAME}`,
  data() {
    return {
      countScarsByCause: [],
      scarsWithCause: [],
      cause: "Option 1",
      chart: ""
    };
  },
  apollo: {
    countScarsByCause: COUNT_SCARS_BY_CAUSE,
    scarsWithCause: {
      query: GET_SCARS_WITH_CAUSE,
      variables() {
        return {
          cause: this.cause
        };
      }
    }
  },
  components: {
    Page
  },

  methods: {
    generateColours(n) {
      var seq = palette("tol-sq", n).map(c => "#" + c);
      return seq;
    },

    createChart(chartId, chartData, handleClick) {
      const ctx = document.getElementById(chartId);
      const chart = new Chart(ctx, chartData);

      // click to update cause
      if (handleClick) {
        ctx.onclick = e => {
          const p = chart.getElementAtEvent(e)[0];
          const label = chart.data.labels[p._index];
          this.cause = label;
          this.$apollo.queries.scarsWithCause.refetch();
        };
      }
      this.chart = chart;
    },

    chartData(type, dataset, options = {}) {
      const { title, chartData } = dataset;

      const data = chartData.map(d => d.value);
      const labels = chartData
        .map(d => d.key)
        .map(l => (l.length > 30 ? l.substring(0, 30) + "..." : l));

      const datasets = [
        {
          label: title,
          backgroundColor: this.generateColours(data.length),
          data
        }
      ];

      return {
        type,
        data: {
          datasets,
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels
        },
        options
      };
    }
  },

  updated() {
    // re-render the bar charts when the data changes
    if (!this.$apollo.queries.scarsWithCause.loading) {
      // bars
      this.scarsWithCause.map(dataset => {
        this.createChart(
          `scar-type-${dataset.title}`,
          this.chartData("bar", dataset, {
            title: {
              display: true,
              text: `Frequency of scar caused by ${this.cause} by ${
                dataset.title
              }.`
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          })
        );
      });
    }

    if (!this.$apollo.queries.countScarsByCause.loading) {
      // pie
      this.countScarsByCause.map(dataset => {
        //console.log(dataset);
        this.createChart(
          "types-chart",
          this.chartData("doughnut", dataset, {
            legend: { position: "bottom" },
            title: {
              display: true,
              text: `Frequency of scars by cause.`
            }
          }),
          true
        );
      });
    }
  },

  mounted() {
    // timeout for smooth animations (hacky?)

    // pie
    this.countScarsByCause.map(dataset => {
      //console.log(dataset);
      this.createChart(
        "types-chart",
        this.chartData("doughnut", dataset, {
          legend: { position: "bottom" },
          title: {
            display: true,
            text: `Frequency of scars by cause.`
          }
        }),
        true
      );
    });

    // bars
    this.scarsWithCause.map(dataset => {
      this.createChart(
        `scar-type-${dataset.title}`,
        this.chartData("bar", dataset, {
          title: {
            display: true,
            text: `Frequency of scar caused by ${this.cause} by ${
              dataset.title
            }.`
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        })
      );
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.charts-grid {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 8px;
}
</style>

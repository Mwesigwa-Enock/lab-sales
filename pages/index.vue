<template>
  <v-row>
    <v-col cols="4">
      <v-card class="mx-auto" max-width="434">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline"> Countries </v-list-item-title>
            <v-divider></v-divider>
            <v-card-text align="center">
              <v-row>
                <v-col class="display-1" cols="12">
                  {{ AnalyticsModel.countries }}</v-col
                >
              </v-row>
            </v-card-text>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>

    <v-col cols="4">
      <v-card class="mx-auto" max-width="434">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline"> Item Types </v-list-item-title>
            <v-divider></v-divider>
            <v-card-text align="center">
              <v-row>
                <v-col class="display-1" cols="12">
                  {{ AnalyticsModel.itemTypes }}
                </v-col>
              </v-row>
            </v-card-text>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>

    <v-col cols="4">
      <v-card class="mx-auto" max-width="434">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline"> Regions </v-list-item-title>
            <v-divider></v-divider>
            <v-card-text align="center">
              <v-row>
                <v-col class="display-1" cols="12">
                  {{ AnalyticsModel.regions }}</v-col
                >
              </v-row>
            </v-card-text>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>

    <v-col cols="4">
      <v-card class="mx-auto" max-width="434">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline">
              Total Profits
            </v-list-item-title>
            <v-divider></v-divider>
            <v-card-text align="center">
              <v-row>
                <v-col class="display-1" cols="12">{{ formatPrice(returnTotal) }} </v-col>
              </v-row>
            </v-card-text>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },

  methods: {
    async getAnalytics() {
      await this.$store.dispatch("ApiCallsHelper/getAnalytics");
    },

    formatPrice(value) {
        let val = (value/1).toFixed(2).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  },

  computed: {
    ...mapState({
      error: (state) => state.ApiCallsHelper.error,
      analytics: (state) => state.ApiCallsHelper.analytics,
      response: (state) => state.ApiCallsHelper.response,
    }),

    returnTotal() {
      return this.AnalyticsModel.totalProfits == null
        ? 0
        : this.AnalyticsModel.totalProfits;
    },

    AnalyticsModel() {
      return Object.assign({}, this.analytics);
    },

    
  },

  created() {},

  mounted() {
    this.getAnalytics();
  },
};
</script>

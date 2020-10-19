<template>
  <div>
    <v-form ref="form">
      <v-card-text>
        <v-overlay :value="loading">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>

        <v-row>
          <v-col cols="12" sm="4">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="startdate"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="startdate"
                  label="Choose Start Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="startdate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(startdate)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" sm="4">
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :return-value.sync="enddate"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="enddate"
                  label="Choose End Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="enddate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu2 = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu2.save(enddate)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="success" @click="getReports"> Search </v-btn>
          </v-card-actions>
        </v-row>

        <v-row>
          <v-col cols="5">
            <v-card class="mx-auto" max-width="434">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="headline">
                    Total Profits - (Top 5 Items)
                  </v-list-item-title>
                  <v-divider></v-divider>
                  <v-card-text align="center">
                    <v-row>
                      <v-col class="display-2" cols="12">
                        {{ formatPrice(salesResponse.totalProfit) }}</v-col
                      >
                    </v-row>
                  </v-card-text>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>

          <v-col cols="12">
            <div>
              <p class="text-uppercase">Top 5 Profitable Items</p>
            </div>
            <v-data-table
              :headers="headers"
              :items="salesResponse.itemsObjs"
              :items-per-page="5"
              class="elevation-1"
            ></v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-form>
  </div>
</template>

<script>
import axios, { post } from "axios";
import moment from "moment";
import { mapState } from "vuex";

export default {
  data: () => ({
    startdate: new Date().toISOString().substr(0, 10),
    enddate: new Date().toISOString().substr(0, 10),
    request: {
      startDate: "",
      endDate: "",
    },
    menu: false,
    modal: false,
    menu2: false,
    loading: false,

    salesResponse: {
      totalProfit: null,
      itemsObjs: [],
    },

    headers: [
      { text: "Item Type", value: "item_type" },
      { text: "Total Profits", value: "totalProfits" },
    ],
  }),

  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    async getReports() {
      let formdata = new FormData();
      (this.request.startDate = this.formatCorrectly(this.startdate)),
        (this.request.endDate = this.formatCorrectly(this.enddate));

      formdata.append("startdate", this.formatCorrectly(this.startdate));
      formdata.append("enddate", this.formatCorrectly(this.enddate));

      console.log(this.formatCorrectly(this.startdate));
      console.log(this.formatCorrectly(this.enddate));

      var getrecords_url =
        "https://cors-anywhere.herokuapp.com/https://laboramus-sales.herokuapp.com/api/sales/getSales";
      var uname = "admin";
      var pass = "secret123";
      const token = Buffer.from(`${uname}:${pass}`, "utf-8").toString("base64");

      this.loading = true;
      await this.$axios
        .$post(getrecords_url, JSON.stringify(this.request), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${token}`,
          },
        })
        .then((resp) => {
          this.salesResponse = resp;
          console.log(this.salesResponse);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    formatCorrectly(date) {
      return moment(String(date)).format("MM/DD/YYYY");
    },
    mounted() {},
  },
};
</script>



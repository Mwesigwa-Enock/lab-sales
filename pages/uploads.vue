<template>
  <div>
    <div>
      <p class="text-uppercase">Upload CSV File</p>
    </div>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <p>{{ response.responseMessage }}</p>
    <v-row no-gutters justify="center" align="center">
      <v-col cols="4">
        <input type="file" @change="onFileSelected" />
      </v-col>

      <v-col cols="4" class="pl-2">
        <v-btn color="success" dark small @click="onUpload">
          Upload
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="4" class="pl-2"> </v-col>
    </v-row>                
 
 <br/>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="records"
          :items-per-page="5"
          class="elevation-1"
          :loading="loader"
        ></v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios, { post } from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      selectedFile: null,
      response: {
        reponseCode: "",
        responseMessage: "",
        responseStatus: false,
      },
      loading: false ,
      headers: [
        {
          text: "Sales ID",
          align: "start",
          sortable: false,
          value: "sale_id",
        },
        { text: "Order Date", value: "order_date" },
        { text: "Order Priority", value: "order_priority" },
        { text: "Units Sold", value: "units_sold" },
        { text: "Unit Price", value: "unit_price" },
        { text: "Total Cost", value: "total_cost" },
        { text: "Item Type", value: "item_type" },
      ],
    };
  },

  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },

    async getRecords() {
      await this.$store.dispatch("ApiCallsHelper/getRecords");
    },

    async onUpload() {
      let formdata = new FormData();
      formdata.append("file", this.selectedFile);
      console.log(formdata);

      var fileUpload_url =
        "https://cors-anywhere.herokuapp.com/https://laboramus-sales.herokuapp.com/api/sales/upload-csv-file";
      var uname = "admin";
      var pass = "secret123";
      const token = Buffer.from(`${uname}:${pass}`, "utf-8").toString("base64");

      this.loading = true;
      await this.$axios
        .$post(fileUpload_url, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Basic ${token}`,
          },
        })
        .then((resp) => {
          this.response = resp;
          console(this.response);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.getRecords();
          this.loading = false;
        });
    },
  },

  computed: {
    ...mapState({
      error: (state) => state.ApiCallsHelper.error,
      records: (state) => state.ApiCallsHelper.records,
      myresponse: (state) => state.ApiCallsHelper.response,
      loader: (state) => state.ApiCallsHelper.loading,
    }),
  },

  mounted() {
    this.getRecords();
  },
};
</script>



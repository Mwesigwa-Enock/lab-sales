//initial variables
export const state = () => ({
  analytics: {
    countries: 0,
    itemTypes: 0,
    regions: 0,
    totalProfits: 0
  },

  records: [],
  error: "",
  response: {
    reponseCode: "",
    responseMessage: "",
    responseStatus: false
  },

  loading: false
});

//setters
export const mutations = {
  SET_ANALYTICS(state, analytics) {
    state.analytics = analytics;
  },

  SET_RECORDS(state, records) {
    state.records = records;
  },

  SET_RESPONSE(state, response) {
    state.response = response;
  },
  TOGGLE_LOADING(state) {
    state.loading = !state.loading;
  },

  SET_ERROR(state, error) {
    state.error = error;
  }
};

export const actions = {
  //retrieve
  async getAnalytics({ commit }) {
    var analytics_url =
      "https://cors-anywhere.herokuapp.com/https://laboramus-sales.herokuapp.com/api/sales/getAnalytics";
    var uname = "admin";
    var pass = "secret123";
    const token = Buffer.from(`${uname}:${pass}`, "utf8").toString("base64");

    await this.$axios
      .$get(analytics_url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`
        }
      })
      .then(resp => {
        console.log(resp);
        commit("SET_ANALYTICS", resp.analyticsObj);
      })
      .catch(err => {
        commit("SET_ERROR", err);
      })
      .finally(() => {});
  },

  //retrieve records
  async getRecords({ commit }) {
    var records_url =
      "https://cors-anywhere.herokuapp.com/https://laboramus-sales.herokuapp.com/api/sales/getRecords";
    var uname = "admin";
    var pass = "secret123";
    const token = Buffer.from(`${uname}:${pass}`, "utf8").toString("base64");
    commit("TOGGLE_LOADING");
    await this.$axios
      .$get(records_url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`
        }
      })
      .then(resp => {
        console.log(resp);
        commit("SET_RECORDS", resp);
      })
      .catch(err => {
        commit("SET_ERROR", err);
      })
      .finally(() => {
        commit("TOGGLE_LOADING");
      });
      
  }
};

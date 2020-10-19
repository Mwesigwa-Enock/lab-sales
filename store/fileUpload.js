export const state = () =>({
    messageRes:{
        reponseCode: "",
        responseMessage: "",
        responseStatus: false
    },
    error:"",
    response: ""

})

//setters
export const mutations = ({
    SET_MESSAGE(state, messageRes){
     state.messageRes = messageRes
    },

    SET_RESPONSE(state, response){
      state.response = response
    },

    SET_ERROR(state, error){
      state.error = error
    }
})


export const actions = ({

    //retrieve
    async UploadFile({
        commit
    }) {
          var fileUpload_url = 'https://cors-anywhere.herokuapp.com/https://laboramus-sales.herokuapp.com/api/sales/upload-csv-file';
          var uname = 'admin';
          var pass = 'secret123';
          const token = Buffer.from(`${uname}:${pass}`, 'utf8').toString('base64')

        await this.$axios.$get(fileUpload_url, { headers:
         {'Content-Type': 'multipart/form-data', 'Authorization': `Basic ${token}`}}, ).then(resp => {
            console.log(resp)
         
           commit('SET_MESSAGE', resp)
        }).catch(err => {
            commit('SET_ERROR', err)
        }).finally(() => {

        })
    },
})
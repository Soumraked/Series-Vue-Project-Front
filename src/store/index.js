import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    save: [],
    seriesDataVuex: [],
    serieDataVuex: {}
  },
  mutations: {
    setSave(state, option){
      state.save.push(option);
    },
    setSeriesData(state, data){
      state.seriesDataVuex = data;
    },
    setSerieData(state, data){
      console.log(data)
      (state.serieDataVuex)[data.id] = data;
      
    }
  },
  actions: {
  },
  modules: {
  }
})

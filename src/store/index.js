import { createStore } from "vuex";

export default createStore({
  state: {
    filter: "Default",
    category: "all"
  },
  mutations: {
    CHANGE_FILTER(state, payload){
      state.filter = payload;
    },
    CHANGE_CATEGORY(state, payload){
      state.category = payload;
    },
  }, 
  getters: {
    GET_FILTER(state){
      return state.filter;
    },
    GET_CATEGORY(state){
      return state.category;
    }
  }
});

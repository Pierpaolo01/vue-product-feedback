import { createStore } from "vuex";

export default createStore({
  state: {
    filter: "Default",
    category: "all",
    appendRequestTo: null,
  },
  mutations: {
    CHANGE_FILTER(state, payload){
      state.filter = payload;
    },
    CHANGE_CATEGORY(state, payload){
      state.category = payload;
    },
    CHANGE_TOTAL(state, payload){
      state.appendRequestTo = payload;
    }
  }, 
  getters: {
    GET_FILTER(state){
      return state.filter;
    },
    GET_CATEGORY(state){
      return state.category;
    },
    GET_TOTAL(state){
      return state.appendRequestTo;
    }
  }
});



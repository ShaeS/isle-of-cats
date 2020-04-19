import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import boat1 from "../data/boat1.json";

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    selectedColor: "",
    boat: boat1,
    lessons: [],
    specials: [],
    rounds: [],
    scores: [
      {
        label: "Blue Families",
        value: "",
      },
      {
        label: "Green Families",
        value: "",
      },
      {
        label: "Orange Families",
        value: "",
      },
      {
        label: "Purple Families",
        value: "",
      },
      {
        label: "Red Families",
        value: "",
      },
      {
        label: "Rare Treasures (3)",
        value: "",
      },
      {
        label: "Lessons",
        value: "",
      },
      {
        label: "Rats (-1)",
        value: "",
      },
      {
        label: "Rooms (-5)",
        value: "",
      },
    ],
  };
};

// initial state
const state = getDefaultState();

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state,
  mutations: {
    selectColor(state, color) {
      state.selectedColor = color;
    },
    handleClick(state, { i, j }) {
      state.boat[i][j].fill = getComputedStyle(
        document.documentElement,
      ).getPropertyValue(`--var-${state.selectedColor}`);
    },
    handleClickFilled(state, { i, j }) {
      if (state.selectedColor === "") {
        state.boat[i][j].fill = "";
      }
    },
    updateLessons(state, payload) {
      state.lessons = payload;
    },
    updateSpecials(state, payload) {
      state.specials = payload;
    },
    updateRounds(state, payload) {
      state.rounds = payload;
    },
    updateScores(state, payload) {
      state.scores = payload;
    },
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    newGame({ commit }) {
      commit("resetState");
    },
  },
});

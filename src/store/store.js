import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import boat1 from "../data/boat1.json";

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    selectedColor: "",
    currentPlaces: [],
    drawing: false,
    colorStep: {
      red: 0,
      blue: 0,
      green: 0,
      purple: 0,
      orange: 0,
      common: 0,
      rare: 0,
    },
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
  getters: {
    tileColor: (state) => {
      if (state.selectedColor === "") {
        return "";
      }
      return getComputedStyle(document.documentElement).getPropertyValue(
        `--var-${state.selectedColor}`,
      );
    },
  },
  mutations: {
    selectColor(state, color) {
      state.selectedColor = color;
    },
    handleClick(state, { i, j, color }) {
      if (state.selectedColor) {
        state.drawing = true;
      }
      if (state.boat[i][j].fill === "") {
        state.boat[i][j].fill = color;
        state.currentPlaces.push({i, j});
      } else {
        const index = state.currentPlaces.findIndex(({ii, jj}) => ii === i && jj === j);
        state.currentPlaces.splice(index, 1)
        state.boat[i][j].fill = "";
        state.boat[i][j].group = null;
      }
    },
    assignNumber(state) {
      state.currentPlaces.map(({ i, j }) => {
        state.boat[i][j].group = state.colorStep[state.selectedColor];
      });
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
    placePiece({ state, commit }) {
      commit("assignNumber");
      state.colorStep[state.selectedColor]++;
      state.drawing = false;
      commit("selectColor", "");
      state.currentPlaces = [];
    },
  },
});

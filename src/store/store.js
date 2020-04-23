import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import boat1 from "../data/boat1.json";
import boat2 from "../data/boat2.json";
import boat3 from "../data/boat3.json";
import boat4 from "../data/boat4.json";
import boat5 from "../data/boat5.json";
import boat6 from "../data/boat6.json";

Vue.use(Vuex);

const getDefaultState = () => {
  const boats = [boat1, boat2, boat3, boat4, boat5, boat6];

  const boat = boats[Math.floor(Math.random() * boats.length)];
  return {
    selectedColor: null,
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
    boat,
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
    deleteHighlight(state, payload) {
      const boat = [...state.boat];
      boat.forEach((row) => {
        row.forEach((square) => {
          if (payload && square) {
            square.temporaryFill = "";
            if (square && payload.group !== null && square.group === payload.group && square.fill === payload.fill) {
              square.temporaryFill = "#e61c1c";
            }
          }
        });
      });

      state.boat = boat;
    },
    deletePiece(state, payload) {
      const boat = [...state.boat];
      const {group, fill} = payload;
      boat.forEach((row) => {
        row.forEach((square) => {
          if (payload && square) {
            if (square && group !== null && square.group === group && square.fill === fill) {
              square.fill = "";
              square.group = null;
              square.temporaryFill = "";
            }
          }
        });
      });

      state.boat = boat;
    },
    selectColor(state, color) {
      state.selectedColor = color;
    },
    temporaryFill(state, payload) {
      const boat = [...state.boat];
      boat.forEach((row) => {
        row.forEach((square) => {
          if (square) {
            square.temporaryFill = "";
          }
        });
      });

      if (payload) {
        payload.shape.forEach((piece) => {
          Vue.set(boat[payload.i + piece.i][payload.j + piece.j], "temporaryFill", payload.color);
        });
      }

      state.boat = boat;
    },
    handleClick(state, places) {
      state.currentPlaces = places;
    },
    assignNumber(state) {
      state.currentPlaces.map(({ i, j }) => {
        state.boat[i][j].group = state.colorStep[state.selectedColor];
        state.boat[i][j].fill = state.boat[i][j].temporaryFill;
        state.boat[i][j].temporaryFill = "";
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
    updateDrawing(state, payload) {
      state.drawing = payload;
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
      commit("selectColor", null);
      state.currentPlaces = [];
    },
    cancelPiece({ state, commit }) {
      state.drawing = false;
      commit("selectColor", "");
      commit("temporaryFill")
      state.currentPlaces = [];
    },
  },
});

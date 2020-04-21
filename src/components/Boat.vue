<template>
  <div class="wrapper">
    <div v-if="!drawing" class="colors">
      <div class="color-group">
        <div
          @click="selectColor('')"
          class="color clear"
          :class="selectedColor === '' && 'active'"
        ></div>
      </div>
      <p class="color-label">Cats:</p>
      <div class="color-group">
        <div
          @click="selectColor('green')"
          class="color green"
          :class="selectedColor === 'green' && 'active'"
        ></div>
        <div
          @click="selectColor('blue')"
          class="color blue"
          :class="selectedColor === 'blue' && 'active'"
        ></div>
        <div
          @click="selectColor('orange')"
          class="color orange"
          :class="selectedColor === 'orange' && 'active'"
        ></div>
        <div
          @click="selectColor('red')"
          class="color red"
          :class="selectedColor === 'red' && 'active'"
        ></div>
        <div
          @click="selectColor('purple')"
          class="color purple"
          :class="selectedColor === 'purple' && 'active'"
        ></div>
      </div>
      <p class="color-label">Common:</p>
      <div class="color-group">
        <div
          @click="selectColor('common')"
          class="color common"
          :class="selectedColor === 'common' && 'active'"
        ></div>
      </div>
      <p class="color-label">Rare:</p>
      <div class="color-group">
        <div
          @click="selectColor('rare')"
          class="color rare"
          :class="selectedColor === 'rare' && 'active'"
        ></div>
      </div>
    </div>

    <div v-else class="colors">
      <button @click="cancelPiece" class="place cancel">
        Cancel Piece
      </button>
      <button @click="placePiece" class="place">
        Place Piece
      </button>
    </div>
    <div class="boat">
      <button class="peek" @mousedown="hide" @mouseleave="show" @mouseup="show">
        <img :src="eye" />Hide Cats
      </button>
      <template v-for="(row, i) in boat">
        <Square
          v-for="(square, j) in row"
          :key="`${i}-${j}`"
          :square="square"
          :hiding="hiding"
          :i="i"
          :j="j"
        />
      </template>
    </div>
  </div>
</template>

<script>
import Square from "./Square";
import eye from "../assets/icons/eye.svg";

export default {
  components: {
    Square,
  },
  data() {
    return {
      hiding: false,
      eye,
    };
  },
  computed: {
    drawing() {
      return this.$store.state.drawing;
    },
    boat() {
      return this.$store.state.boat;
    },
    selectedColor() {
      return this.$store.state.selectedColor;
    },
  },
  methods: {
    hide() {
      this.hiding = true;
    },
    show() {
      this.hiding = false;
    },
    placePiece() {
      this.$store.dispatch("placePiece");
    },
    cancelPiece() {
      this.$store.dispatch("cancelPiece");
    },
    selectColor(color) {
      this.$store.commit("selectColor", color);
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.boat {
  position: relative;
  padding: 24px;
  display: grid;
  grid-template-rows: repeat(9, 60px);
  grid-template-columns: repeat(22, 60px);
  grid-gap: 1px;
  filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.2));
}

@media only screen and (max-width: 1400px) {
  .boat {
    grid-template-rows: repeat(9, 50px);
    grid-template-columns: repeat(22, 50px);
  }
}

@media only screen and (max-width: 1200px) {
  .boat {
    grid-template-rows: repeat(9, 40px);
    grid-template-columns: repeat(22, 40px);
  }
}

.peek {
  display: flex;
  cursor: pointer;
  align-items: center;
  position: absolute;
  z-index: 100;
  top: 24px;
  left: 24px;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 0 24px;
  border: 0;
  background: var(--var-common);
  font-size: 16px;
  font-weight: bold;
  color: white;
  border-radius: 100px;
}

.peek img {
  width: 24px;
  margin-right: 8px;
}

.peek:focus {
  outline: none;
}

.peek:hover {
  background: var(--var-common-dark);
}

.place {
  margin: 0 24px;
  background: var(--var-green);
  color: white;
  padding: 12px 24px;
  border: 0;
  font-size: 18px;
  border-radius: 100px;
  cursor: pointer;
  font-weight: bold;
}

.place.cancel {
  background: var(--var-red);
}

.place:hover {
  background: var(--var-green-dark);
}

.place.cancel:hover {
  background: var(--var-red-dark);
}

.place:focus {
  outline: none;
}

.colors {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.color-group {
  display: flex;
}

.color-label {
  margin-left: 16px;
  font-weight: bold;
}

.color {
  cursor: pointer;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 0 16px;
  opacity: 0.9;
  transition: box-shadow 0.2s;
}

.color.active {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: default;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.5);
}

.color.active:before {
  content: "";
  position: absolute;
  z-index: 1;
  border-radius: 50%;
  height: 24px;
  width: 24px;
  background: #fff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
}

.color.clear {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: white;
  border: 6px solid #e61c1c;
}

.color.clear:after {
  content: "";
  background: #e61c1c;
  transform: rotate(45deg);
  position: absolute;
  width: 6px;
  height: 100%;
}

.color.clear:before {
  background: #333;
}

.color.green {
  background: var(--var-green);
}

.color.blue {
  background: var(--var-blue);
}

.color.orange {
  background: var(--var-orange);
}

.color.red {
  background: var(--var-red);
}

.color.purple {
  background: var(--var-purple);
}

.color.common {
  background: var(--var-common);
}

.color.rare {
  background: var(--var-rare);
}
</style>

<template>
  <div class="wrapper">
    <div class="colors">
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
      <button v-if="drawing" @click="placePiece" class="place">
        Place Piece
      </button>
    </div>
    <div class="boat">
      <template v-for="(row, i) in boat">
        <div
          @click="handleClick(i, j, square)"
          v-for="(square, j) in row"
          :key="`${i}-${j}`"
          class="square"
          :class="[`row-${i + 1}`, !square && 'empty']"
        >
        <template v-if="square">
          <div
            @click="handleClickFilled(i, j)"
            v-if="square.fill"
            class="fill"
            :style="{ background: square.fill }"
          ><p v-if="square.group !== null">{{square.group}}</p></div>
          <template v-if="square.border">
            <div
              v-for="border in square.border"
              :key="`${i}-${j}-${border}`"
              class="border"
              :class="border"
            ></div>
          </template>
          <Map
            v-if="square.map"
            class="map"
            :style="{ fill: `var(--var-${square.map})` }"
          />
          <img v-if="square.icon" class="icon" :src="icons[square.icon]" />
          <img v-if="square.rat" class="rat" :src="rat" />
          
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Map from "./Map";
import apple from "../assets/icons/apple.svg";
import parrot from "../assets/icons/parrot.svg";
import feather from "../assets/icons/feather.svg";
import moon from "../assets/icons/moon.svg";
import rat from "../assets/icons/rat.svg";

export default {
  components: {
    Map,
  },
  data() {
    return {
      rat,
      icons: {
        apple,
        feather,
        parrot,
        moon,
      },
      currentPlaces: []
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
    tileColor() {
      return this.$store.getters.tileColor;
    },
  },
  methods: {
    placePiece() {
      this.$store.dispatch("placePiece", this.currentPlaces);
      this.currentPlaces = [];
    },
    selectColor(color) {
      this.$store.commit("selectColor", color);
    },
    handleClick(i, j, square) {
      if (square) {
        this.currentPlaces.push({i, j});
        this.$store.commit("handleClick", { i, j, color: this.tileColor });
      }
    },
    handleClickFilled(i, j) {
      this.$store.commit("handleClickFilled", { i, j });
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
  padding: 24px;
  margin-left: -60px;
  display: grid;
  grid-template-rows: repeat(9, 60px);
  grid-template-columns: repeat(23, 60px);
  grid-gap: 1px;
  filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.2));
}

.square {
  cursor: pointer;
  background: white;
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 0 1px rgb(156, 156, 156);
}

.square.empty {
  box-shadow: none;
  background: none;
  cursor: default;
}

.fill {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  opacity: 0.75;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color : white;
  font-weight: 900;
  font-size: 24px;
}

.border {
  position: absolute;
  z-index: 1;
  background: rgb(105, 105, 105);
}

.border.left {
  left: -2px;
  top: 0;
  bottom: 0;
  width: 3px;
}

.border.top {
  top: -2px;
  left: 0;
  right: 0;
  height: 3px;
}

.border.bottom {
  bottom: -2px;
  left: 0;
  right: 0;
  height: 3px;
}

.border.right {
  right: -2px;
  top: 0;
  bottom: 0;
  width: 3px;
}

.icon {
  opacity: 0.3;
  width: 14px;
  position: absolute;
  bottom: 4px;
  right: 4px;
}

.map {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 40px;
}

.rat {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 32px;
}

.place {
  margin-left: 48px;
  background: var(--var-green);
  color: white;
  padding: 12px 24px;
  border: 0;
  font-size: 18px;
  border-radius: 100px;
  cursor: pointer;
  font-weight: bold;
}

.place:hover {
  background: var(--var-green-dark);
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
  opacity: 0.75;
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

.row-2 {
  grid-row-start: 2;
}

.row-3 {
  grid-row-start: 3;
}

.row-4 {
  grid-row-start: 4;
}

.row-5 {
  grid-row-start: 5;
}

.row-6 {
  grid-row-start: 6;
}

.row-7 {
  grid-row-start: 7;
}

.row-8 {
  grid-row-start: 8;
}

.row-9 {
  grid-row-start: 9;
}
</style>

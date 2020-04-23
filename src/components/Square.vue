<template>
  <div
    class="square"
    :class="[`row-${i + 1}`, !square && 'empty']"
  >
    <template v-if="square">
      <div
        v-if="square.fill"
        class="fill"
        :class="{hide: hiding}"
        :style="{ background: square.fill, ...borderStyles }"
      ></div>
      <div
        v-if="square.temporaryFill"
        class="fill"
        :style="{ background: square.temporaryFill }"
      ></div>
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

<script>
const tinycolor = require("tinycolor2");
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
  props: ["i", "j", "square", "hiding"],
  data() {
    return {
      rat,
      icons: {
        apple,
        feather,
        parrot,
        moon,
      },
    };
  },
  computed: {
    boat() {
      return this.$store.state.boat;
    },
    tileColor() {
      return this.$store.getters.tileColor;
    },
    borderStyles() {
      const current = this.boat[this.i][this.j];
      const top = this.boat[this.i - 1] && this.boat[this.i - 1][this.j];
      const left = this.boat[this.i] && this.boat[this.i][this.j - 1];
      const right = this.boat[this.i] && this.boat[this.i][this.j + 1];
      const bottom = this.boat[this.i + 1] && this.boat[this.i + 1][this.j];

      const styles = {};
      if (top && (top.group !== current.group || top.fill !== current.fill)) {
        styles.borderTopColor = tinycolor(current.fill).lighten(15);
      }
      if (
        left &&
        (left.group !== current.group || left.fill !== current.fill)
      ) {
        styles.borderLeftColor = tinycolor(current.fill).lighten(15);
      }
      if (
        right &&
        (right.group !== current.group || right.fill !== current.fill)
      ) {
        styles.borderRightColor = tinycolor(current.fill).lighten(15);
      }
      if (
        bottom &&
        (bottom.group !== current.group || bottom.fill !== current.fill)
      ) {
        styles.borderBottomColor = tinycolor(current.fill).lighten(15);
      }
      return styles;
    },
  },
  methods: {
    placePiece() {
      this.$store.dispatch("placePiece");
    },
  },
};
</script>

<style scoped>
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
  opacity: 0.9;
  z-index: 2;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border-width: 3px;
  border-style: solid;
  border-color: transparent;
}

.fill.hide {
  opacity: 0.2;
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

@media only screen and (max-width: 1400px) {
  .rat {
    width: 28px;
  }

  .map {
    width: 28px;
  }
}

@media only screen and (max-width: 1200px) {
  .rat {
    width: 24px;
  }

  .map {
    width: 24px;
  }

  .icon {
    width: 10px;
  }
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

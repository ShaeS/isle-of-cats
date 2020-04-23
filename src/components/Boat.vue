<template>
  <div class="wrapper">
    <div v-if="!drawing" class="colors">
      <button v-if="deleting" @click="deleting = false" class="place cancel">
        Cancel Delete
      </button>
      <template v-if="!deleting">
        <p class="color-label">Delete:</p>
        <div class="color-group">
          <div @click="deleting = true" class="color clear"></div>
        </div>
        <p class="color-label">Cats:</p>
        <div class="color-group">
          <div @click="selectColor('green')" class="color green"></div>
          <div @click="selectColor('blue')" class="color blue"></div>
          <div @click="selectColor('orange')" class="color orange"></div>
          <div @click="selectColor('red')" class="color red"></div>
          <div @click="selectColor('purple')" class="color purple"></div>
        </div>
        <p class="color-label">Common:</p>
        <div class="color-group">
          <div @click="selectColor('common')" class="color common"></div>
        </div>
        <p class="color-label">Rare:</p>
        <div class="color-group">
          <div @click="selectColor('rare')" class="color rare"></div>
        </div>
      </template>
    </div>

    <div v-else class="colors">
      <button @click="cancelPiece" class="place cancel">
        Cancel Piece
      </button>
      <button @click="rotate('left')" class="rotate"><img :src="left" />(A key)</button>
      <button @click="rotate('flip')" class="rotate"><img :src="flip" />(S Key)</button>
      <button @click="rotate('right')" class="rotate"><img :src="right" />(D Key)</button>
      <button @click="placePiece" :disabled="!freezePiece" class="place">
        Place Piece
      </button>
    </div>
    <div class="boat">
      <button class="peek" @mousedown="hide" @mouseleave="show" @mouseup="show">
        <img :src="eye" />Hide Cats
      </button>
      <template v-for="(row, i) in boat">
        <Square
          @mouseover.native="temporaryFill(square, i, j)"
          @click.native="clickFreeze(i, j, square)"
          v-for="(square, j) in row"
          :key="`${i}-${j}`"
          :square="square"
          :hiding="hiding"
          :i="i"
          :j="j"
        />
      </template>
    </div>
    <Modal v-if="showModal" @close="showModal = false">
      <div class="modal-card">
        <h4 class="modal-title">Draw your tile in any orientation.</h4>
        <div class="small-grid">
          <template v-for="(piece, i) in pieces">
            <div
              v-for="(square, j) in piece"
              :key="`${i}-${j}`"
              @click="handleSmallClick(i, j)"
              class="small-square"
            >
              <div
                v-if="square"
                class="fill"
                :style="{ background: tileColor }"
              ></div>
            </div>
          </template>
        </div>
        <div class="modal-footer">
          <button @click="confirmPiece" class="button">
            Confirm Piece
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "./Modal";
import Square from "./Square";
import eye from "../assets/icons/eye.svg";
import left from "../assets/icons/left.svg";
import right from "../assets/icons/right.svg";
import flip from "../assets/icons/flip.svg";

const defaultPiece = [
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
];

export default {
  components: {
    Square,
    Modal,
  },
  data() {
    return {
      deleting: false,
      currentI: 0,
      currentJ: 0,
      selectedPiece: [],
      pieces: [...defaultPiece],
      freezePiece: false,
      overlapPiece: false,
      showModal: false,
      hiding: false,
      eye,
      left,
      flip,
      right,
    };
  },
  mounted() {
    document.addEventListener("keyup", (e) => {
      if (e.keyCode === 68) {
        this.rotate("right");
      }
      if (e.keyCode === 65) {
        this.rotate("left");
      }
      if (e.keyCode === 83) {
        this.rotate("flip");
      }
    });
  },
  computed: {
    drawing() {
      return this.$store.state.drawing;
    },
    tileColor() {
      return this.$store.getters.tileColor;
    },
    boat() {
      return this.$store.state.boat;
    },
    selectedColor() {
      return this.$store.state.selectedColor;
    },
  },
  methods: {
    rotate(dir) {
      if (!this.freezePiece) {
        this.selectedPiece = this.selectedPiece.map((piece) => {
          if (dir === "right") {
            return { i: piece.j, j: piece.i * -1 };
          } else if (dir === "left") {
            return { i: piece.j * -1, j: piece.i };
          } else if (dir === "flip") {
            return { i: piece.i, j: piece.j * -1 };
          }
        });
        this.temporaryFill(true);
      }
    },
    clickFreeze(i, j, square) {
      if (this.deleting) {
        this.deletePiece(square);
        return;
      }
      if (this.freezePiece) {
        this.freezePiece = false;
      } else {
        if (!this.overlapPiece) {
          this.freezePiece = true;
          this.handleClick(
            this.selectedPiece.map((piece) => ({
              i: piece.i + i,
              j: piece.j + j,
            })),
          );
        }
      }
    },
    deletePiece(square) {
      this.deleting = false;
      this.$store.commit("deletePiece", square);
    },
    deleteHighlight(square) {
      this.$store.commit("deleteHighlight", square);
    },
    temporaryFill(square, i, j) {
      if (this.deleting) {
        this.deleteHighlight(square);
        return;
      }
      if (i !== undefined && j !== undefined && !this.freezePiece) {
        this.currentI = i;
        this.currentJ = j;
      }
      let acceptPiece = true;
      this.overlapPiece = false;
      this.selectedPiece.forEach((piece) => {
        if (
          !this.boat[this.currentI + piece.i] ||
          !this.boat[this.currentI + piece.i][this.currentJ + piece.j]
        ) {
          acceptPiece = false;
        }
        if (
          this.boat[this.currentI + piece.i] &&
          this.boat[this.currentI + piece.i][this.currentJ + piece.j] &&
          this.boat[this.currentI + piece.i][this.currentJ + piece.j].fill
        ) {
          this.overlapPiece = true;
        }
      });
      if (acceptPiece && square && (!this.freezePiece || square === true)) {
        this.$store.commit("temporaryFill", {
          i: this.currentI,
          j: this.currentJ,
          color: this.overlapPiece ? "#555" : this.tileColor,
          shape: this.selectedPiece,
        });
      }
    },
    confirmPiece() {
      this.showModal = false;
      this.updateDrawing(true);
      let selected = [];
      this.pieces.forEach((piece, i) => {
        piece.forEach((square, j) => {
          if (square) {
            selected.push({ i, j });
          }
        });
      });

      let averageX = 0;
      let averageY = 0;
      selected.forEach(({ i, j }) => {
        averageX = averageX + i;
        averageY = averageY + j;
      });

      averageX = averageX / selected.length;
      averageY = averageY / selected.length;

      selected = selected.map(({ i, j }) => {
        return { i: Math.ceil(i - averageX), j: Math.ceil(j - averageY) };
      });

      this.selectedPiece = selected;
      this.pieces = [...defaultPiece];
    },
    handleSmallClick(i, j) {
      const arr = [...this.pieces[i]];
      if (arr[j]) {
        arr[j] = false;
      } else {
        arr[j] = true;
      }
      this.pieces.splice(i, 1, arr);
    },
    handleClick(piece) {
      this.$store.commit("handleClick", piece);
    },
    updateDrawing(val) {
      this.$store.commit("updateDrawing", val);
    },
    hide() {
      this.hiding = true;
    },
    show() {
      this.hiding = false;
    },
    placePiece() {
      this.freezePiece = false;
      this.selectedPiece = [];
      this.$store.dispatch("placePiece");
    },
    cancelPiece() {
      this.freezePiece = false;
      this.selectedPiece = [];
      this.$store.dispatch("cancelPiece");
    },
    selectColor(color) {
      this.showModal = true;
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

.rotate {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  align-items: center;
  margin: 0 4px;
  padding: 8px 24px;
  border: 0;
  background: var(--var-blue);
  font-size: 14px;
  font-weight: bold;
  color: white;
  border-radius: 5px;

}

.rotate img {
  width: 24px;
  margin-bottom: 8px;
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

.place:disabled {
  background: var(--var-common);
  opacity: 0.6;
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

.small-grid {
  display: grid;
  grid-template-rows: repeat(5, 60px);
  grid-template-columns: repeat(5, 60px);
  grid-gap: 1px;
}

.small-square {
  cursor: pointer;
  background: white;
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 0 1px rgb(156, 156, 156);
}

.small-square.empty {
  box-shadow: none;
  background: none;
  cursor: default;
}

.small-square .fill {
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

.button {
  cursor: pointer;
  margin-top: 16px;
  padding: 12px 24px;
  border-radius: 100px;
  background: var(--var-blue);
  color: white;
  border: 0;
  font-size: 16px;
  font-weight: bold;
}

.button:hover {
  background: var(--var-blue-dark);
}

.button:focus {
  outline: none;
}

.modal-title {
  margin-bottom: 8px;
}

.modal-card {
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  padding: 48px;
  padding-bottom: 24px;
}

.modal-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.colors {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 68px;
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

.color:hover {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.5);
}

.color:hover:before {
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

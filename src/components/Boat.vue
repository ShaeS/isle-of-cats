<template>
  <div class="boat">
      <template v-for="(row, i) in rows">
          <div :key="`${i}-${j}-offset`" class="offset" :class="`row-${i + 1}`"></div>
        <div v-for="(square, j) in row" :key="`${i}-${j}`" class="square" :class="`row-${i + 1}`"></div>
      </template>
  </div>
</template>

<script>
export default {
    data() {
        return {
            rows:[8,13,18,21,22,21,18,13,8]
        }
    }
}
</script>

<style scoped>
.boat {
    display: grid;
    width: 100%;
    grid-template-rows: repeat(9, 50px);
    grid-template-columns: repeat(23, 50px);
}

.square {
    width: 100%;
    height: 100%;
    border: 1px solid #333;
}

.row-1.offset {
    grid-column: span 8;
}

.row-2 {
    grid-row-start: 2;
}
.row-2.offset {
    grid-column: span 5;
}

.row-3 {
    grid-row-start: 3;
}
.row-3.offset {
    grid-column: span 2;
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
.row-7.offset {
    grid-column: span 2;
}

.row-8 {
    grid-row-start: 8;
}
.row-8.offset {
    grid-column: span 5;
}

.row-9 {
    grid-row-start: 9;
}
.row-9.offset {
    grid-column: span 8;
}
</style>


<template>
  <div class="card">
    <h2>Specials</h2>
    <p class="sub-text">
      You may use 1 special per round, and 3 specials in total.
    </p>
    <div class="special-list">
      <div v-for="item in options" :key="item" class="checkbox-container">
        <label class="checkbox-label">
          <input type="checkbox" :value="item" v-model="specials" />
          <span class="checkbox-custom"></span>
        </label>
        <div class="input-title">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      specials: [],
      options: [
        "Take 1 additional item from any other row.",
        "Draw your next cat twice.",
        "Draw your next treasure twice.",
        "Take a column instead of a row.",
        "Take 1 item from each column instead of taking a row.",
      ],
    };
  },
};
</script>

<style scoped>
.card {
  border-left: 6px solid var(--var-orange);
  border-radius: 3px;
  padding: 24px 32px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

.sub-text {
    font-size: 12px;
    color: #777;
  margin-bottom: 8px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  padding: 8px 0;
}

/* Styling Checkbox Starts */
.checkbox-label {
  display: block;
  position: relative;
  cursor: pointer;
  height: 20px;
  width: 20px;
  margin-right: 12px;
}

.checkbox-label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkbox-label .checkbox-custom {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 20px;
  width: 20px;
  background-color: transparent;
  border-radius: 3px;
  border: 2px solid var(--var-orange);
}

.checkbox-label input:checked ~ .checkbox-custom {
  background-color: var(--var-orange);
  opacity: 1;
}

.checkbox-label .checkbox-custom::after {
  position: absolute;
  content: "";
  height: 0px;
  width: 0px;
  border-radius: 5px;
  border: solid #fff;
  border-width: 0 3px 3px 0;
  opacity: 1;
  margin-top: -1px;
}

.checkbox-label input:checked ~ .checkbox-custom::after {
  transform: rotate(45deg);
  opacity: 1;
  width: 5px;
  height: 10px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  background-color: transparent;
  border-radius: 0;
}
</style>

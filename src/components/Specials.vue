<template>
  <div class="card">
    <h2>Specials</h2>
    <p class="sub-text">
      You may use 1 special per round, and 3 specials in total.
    </p>
    <div>
      <Checkbox
        v-for="item in options"
        :key="item"
        v-model="specials"
        :label="item"
        color="orange"
        :disabled="specials.length >= 3 && !specials.includes(item)"
      />
    </div>
  </div>
</template>

<script>
import Checkbox from "./Checkbox";

export default {
  components: {
    Checkbox,
  },
  data() {
    return {
      options: [
        "Take 1 additional item from any other row.",
        "Draw your next cat twice.",
        "Draw your next treasure twice.",
        "Take a column instead of a row.",
        "Take 1 item from each column instead of taking a row.",
      ],
    };
  },
  computed: {
    specials: {
      get() {
        return this.$store.state.specials;
      },
      set(value) {
        this.$store.commit("updateSpecials", value);
      },
    },
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
</style>

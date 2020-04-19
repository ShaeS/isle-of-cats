<template>
  <div class="card">
    <h2>Notes</h2>
    <div>
      <div v-for="note in 7" :key="note" class="note">
        <p>Round {{ note }}</p>
        <input v-if="rounds" type="text" v-model="rounds[note - 1]" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    rounds: {
      get() {
        return this.$store.state.rounds;
      },
      set(value) {
        this.$store.commit("updateRounds", value);
      },
    },
  },
};
</script>

<style scoped>
.card {
  border-left: 6px solid var(--var-purple);
  border-radius: 3px;
  padding: 24px 32px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

h2 {
  margin-bottom: 12px;
}

.note {
  display: flex;
  align-items: center;
  padding: 12px 0;
}

.note p {
  font-size: 18px;
  font-weight: bold;
  margin-right: 12px;
}

.note input {
  flex: 1;
  border-radius: 3px;
  border: 0;
  padding: 12px 16px;
  font-size: 14px;
  background: rgb(243, 243, 243);
}
</style>

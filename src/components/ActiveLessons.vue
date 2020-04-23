<template>
  <div class="wrapper">
    <div class="card">
      <h2>Active Lessons</h2>
      <div class="lesson-list" :class="lessons.length > 1 && 'columns'">
        <p v-for="lesson in lessons" :key="lesson">{{ lesson }}</p>
        <div v-if="lessons.length === 0" class="sub-text">
          You have no active lessons. <button @click="showModal = true" class="quick-add">Add One?</button>
        </div>
      </div>
    </div>
    <button @click="showModal = true" class="button">Add New Lesson</button>
    <Modal v-if="showModal" @close="showModal = false">
      <div class="card modal-card">
        <div>
          <Checkbox
            v-for="lesson in options"
            :key="lesson"
            v-model="lessons"
            :label="lesson"
            color="blue"
          />
        </div>
        <div class="modal-footer">
          <div class="legend-container">
            <div class="legend-wrap">
              <img :src="parrot" class="legend" />Captain&apos;s Room
            </div>
            <div class="legend-wrap">
              <img :src="apple" class="legend" />Dining Room
            </div>
          </div>
          <button @click="showModal = false" class="button">Close</button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "./Modal";
import Checkbox from "./Checkbox";
import apple from "../assets/icons/apple.svg";
import parrot from "../assets/icons/parrot.svg";

export default {
  components: {
    Modal,
    Checkbox,
  },
  data() {
    return {
      parrot,
      apple,
      options: [
        "Pick a colour. 1 point per cat of the chosen colour touching the edge of your boat.",
        "1 point per 2 cats touching the edge of your boat.",
        "1 point per common treasure on your boat.",
        "1 point per lesson card in front of you.",
        "1 point per lonely cat on your boat.",
        "2 points per rare treasure on your boat.",
        "2 points per visible rat on your boat.",
        "4 points per family of 4 or more cats on your boat.",
        "10 points if you have exactly 15 cats on your boat.",
        "10 points if you have exactly 5 visible rats on your boat.",
        "10 points if you have no visible rats on your boat.",
        "12 points if both Captain’s Rooms are full.",
        "12 points if there are no empty spaces at the edge of your boat.",
        "15 points if the Dining Room is empty.",
      ],
      showModal: false,
    };
  },
  computed: {
    lessons: {
      get() {
        return this.$store.state.lessons;
      },
      set(value) {
        this.$store.commit("updateLessons", value);
      },
    },
  },
};
</script>

<style scoped>
.wrapper {
  text-align: center;
}

.card {
  text-align: left;
  border-left: 6px solid var(--var-blue);
  border-radius: 3px;
  padding: 24px 32px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

.sub-text {
  color: #777;
  font-size: 16px;
}

.modal-card {
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  padding: 32px 48px;
}

h2 {
  margin-bottom: 8px;
}

.lesson-list.columns {
  column-count: 2;
}

.lesson-list p {
  padding: 8px 0;
}

.lesson-list p:before {
  content: "";
  display: inline-block;
  background: var(--var-blue);
  border-radius: 50%;
  height: 10px;
  width: 10px;
  margin-right: 8px;
}

.quick-add {
  color: var(--var-blue);
  font-weight: bold;
  border: 0;
  background: none;
  font-size: 14px;
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

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.legend-container {
  display: flex;
}

.legend-wrap {
  margin-top: 16px;
  margin-right: 24px;
  display: flex;
}

.legend {
  margin-right: 12px;
  opacity: 0.6;
  width: 20px;
}
</style>

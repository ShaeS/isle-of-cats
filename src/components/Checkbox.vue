<template>
  <div class="checkbox-container">
    <label class="checkbox-label">
      <input
        type="checkbox"
        :value="label"
        v-model="checked"
        @change="onChange"
        :disabled="disabled"
      />
      <span
        class="checkbox-custom"
        :style="{
          borderColor: computedColor,
          backgroundColor: checked.includes(label) ? computedColor : 'transparent'
        }"
      ></span>
    </label>
    <div class="input-title">{{ label }}</div>
  </div>
</template>

<script>
export default {
  props: ["label", "value", "disabled", "color"],
  data() {
    return {
      checkedProxy: false,
    };
  },
  computed: {
    computedColor() {
      return getComputedStyle(document.documentElement).getPropertyValue(
        `--var-${this.color}`,
      );
    },
    checked: {
      get() {
        return this.value;
      },
      set(val) {
        this.checkedProxy = val;
      },
    },
  },
  methods: {
    onChange: function() {
      this.$emit("input", this.checkedProxy);
    },
  },
};
</script>

<style scoped>
.checkbox-container {
  display: flex;
  align-items: center;
  padding: 8px 0;
}

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
  border: 2px solid transparent;
}

.checkbox-label input:checked ~ .checkbox-custom {
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

<template>
  <transition name="modal">
    <div class="modal">
      <div class="modal-mask" @click="$emit('close')"></div>
      <div class="modal-wrapper">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-mask {
  position: fixed;
  z-index: 9997;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  position: relative;
  z-index: 9999;
}
</style>

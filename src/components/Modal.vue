<script setup lang="ts">
import { ref } from "vue";
import ConfirmModal from "./ConfirmModal.vue";
const emit = defineEmits(["close-modal", "delete-item"]);
const props = defineProps(["chosenItem"]);
let isDeleting = ref(false);
const closeModal = () => {
  isDeleting.value = false;
  emit("close-modal");
};

const handleDeleteConfirmClick = (quantity: number) => {
  if (quantity > 0 && quantity <= props.chosenItem.quantity) {
    emit("delete-item", quantity);
    closeModal();
  }
};

const handleDeleteCancelClick = () => {
  isDeleting.value = false;
};
</script>

<template>
  <div class="modal">
    <div
      v-if="chosenItem"
      :style="`background: ${chosenItem.color}; width: 200px; height: 200px; opacity: 0.6`"
    />
    <div class="divider" />
    <h1>Lorem ipsum</h1>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur enim
      quasi repellendus laboriosam ab. Velit laudantium quibusdam minima
      pariatur voluptates cumque quas! Dolores rerum perspiciatis nisi incidunt
      ea in assumenda?
    </p>
    <div class="divider" />
    <button @click="isDeleting = true" class="delete-button">
      Удалить предмет
    </button>
    <button @click="closeModal" class="close-button">
      <svg
        fill="#ffffff"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z"
            fill-rule="evenodd"
          ></path>
        </g>
      </svg>
    </button>
    <transition name="slide-fade">
      <ConfirmModal
        @delete-item="handleDeleteConfirmClick"
        @cancel-delete="handleDeleteCancelClick"
        v-if="isDeleting"
      />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease-in-out;
}
.slide-fade-enter-from {
  transform: translateY(10px);
  opacity: 0;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
.modal {
  width: 45%;
  height: 100%;
  padding: 50px 25px 15px;
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
  right: 0;
  top: 0;
  border: 1px solid $border_color;
  background-color: #1d1d1d6b;
  backdrop-filter: blur(10px);
  .divider {
    width: 100%;
    border: 1px solid $border_color;
  }
  .delete-button {
    padding: 30px;
    width: 100%;
    font-size: 20px;
    background: $delete_color;
    border-radius: 8px;
    outline: none;
    border: none;
    color: #fff;
    cursor: pointer;
  }
  .close-button {
    position: absolute;
    top: 25px;
    right: 25px;
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }
}
</style>

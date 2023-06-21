<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Ref } from "vue";
import Modal from "./Modal.vue";

const arr = new Array(23).fill("");
const items = ref(arr);
let isModalShow = ref(false);
let chosenItem = ref(null);
const styleList: Ref<HTMLDivElement[]> = ref([]);

onMounted(() => {
  if (localStorage.getItem("initial-array")) {
    items.value = JSON.parse(String(localStorage.getItem("initial-array")));
  } else {
    const initialArray = [
      { id: 1, color: "red", quantity: 4 },
      { id: 2, color: "green", quantity: 10 },
      ...arr,
    ];
    localStorage.setItem("initial-array", JSON.stringify(initialArray));
    items.value = initialArray;
  }
});

const closeModal = () => {
  isModalShow.value = false;
  chosenItem.value = null;
};

const startDrag = (event: DragEvent, index: number) => {
  if (event.dataTransfer) {
    styleList.value[index].classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("itemIndex", String(index));
  }
};

const onDrop = (event: DragEvent, newIndex: number) => {
  if (!items.value[newIndex]) {
    const itemIndex = Number(event.dataTransfer?.getData("itemIndex"));
    styleList.value[itemIndex].classList.remove("dragging");
    const item = items.value[itemIndex];
    items.value[newIndex] = item;
    items.value[itemIndex] = "";
    saveArray();
  }
};

const openModal = (item) => {
  if (item) {
    chosenItem.value = item;
    isModalShow.value = true;
  } else {
    isModalShow.value = false;
  }
};

const deleteItem = (quantity: number) => {
  const itemIndex = items.value.findIndex(
    (item) => item.id === chosenItem.value.id
  );
  if (items.value[itemIndex].quantity === quantity) {
    items.value[itemIndex] = "";
  } else {
    items.value[itemIndex].quantity -= quantity;
  }
  saveArray();
};

const saveArray = () => {
  localStorage.setItem("initial-array", JSON.stringify(items.value));
};
</script>
<template>
  <div class="content_container inventory">
    <div
      ref="styleList"
      :draggable="item ? true : false"
      @click="openModal(item)"
      @dragenter.prevent
      @dragover.prevent
      @drop="onDrop($event, index)"
      @dragstart="startDrag($event, index)"
      dropzone
      class="inventory__slot"
      v-for="(item, index) in items"
      :key="Date.now() + index"
    >
      <div
        v-if="item"
        :style="`background: ${item.color}; width: 60%; height: 60%; opacity: 0.6`"
      />
      <div v-if="item" class="quantity">{{ item.quantity }}</div>
    </div>
    <transition name="slide-fade">
      <Modal
        v-if="isModalShow"
        :chosen-item="chosenItem"
        @close-modal="closeModal"
        @delete-item="deleteItem"
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
  transform: translateX(10px);
  opacity: 0;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.inventory {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  width: 100%;
  position: relative;
  &__slot {
    width: 20%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid $border_color;
    position: relative;
    &:not(:empty) {
      cursor: grab;
    }
    .quantity {
      position: absolute;
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 1px solid $border_color;
      border-top: 1px solid $border_color;
      border-top-left-radius: 5px;
      bottom: 0;
      right: 0;
      color: #fff;
    }
  }
}
</style>

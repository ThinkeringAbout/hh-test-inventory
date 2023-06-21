<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import Modal from "./Modal.vue";

const arr = new Array(25).fill("");
const items = ref(arr);
let isModalShow = ref(false);
let chosenItem = ref(null);
const styleList: Ref<HTMLDivElement[]> = ref([]);

items.value[0] = {
  id: 1,
  color: "red",
  quantity: 4,
};
items.value[1] = {
  id: 0,
  color: "green",
  quantity: 10,
};

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
  }
};

const test = (item) => {
  if (item) {
    chosenItem.value = item;
    isModalShow.value = true;
  } else {
    isModalShow.value = false;
  }
};

const deleteItem = (quantity: number) => {
  const itemIndex = items.value.findIndex(item => item.id === chosenItem.value.id);
  if (items.value[itemIndex].quantity === quantity) {
    items.value[itemIndex] = ""
  } else {
    items.value[itemIndex].quantity -= quantity
  }
}


</script>
<template>
  <div class="content_container inventory">
    <div
      ref="styleList"
      draggable="true"
      @click="test(item)"
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
    <Modal v-if="isModalShow" :chosen-item="chosenItem" @close-modal="closeModal" @delete-item="deleteItem" />
  </div>
</template>

<style lang="scss">
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

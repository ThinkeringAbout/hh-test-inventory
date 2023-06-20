<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
const arr = new Array(25).fill("");
const items = ref(arr);
const styleList: Ref<HTMLDivElement[]> = ref([]);
items.value[0] = "1";
items.value[1] = "2";

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
</script>
<template>
  <div class="content_container inventory">
    <div
      ref="styleList"
      draggable="true"
      @dragenter.prevent
      @dragover.prevent
      @drop="onDrop($event, index)"
      @dragstart="startDrag($event, index)"
      dropzone
      class="inventory__slot"
      v-for="(item, index) in items"
      :key="index"
    >
      {{ item }}
    </div>
  </div>
</template>

<style lang="scss">
.inventory {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  width: 100%;
  &__slot {
    width: 20%;
    height: 20%;
    &:not(:empty) {
      cursor: grab;
    }
    border: 1px solid $border_color;
  }
}
</style>

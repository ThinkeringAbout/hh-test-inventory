<script lang="ts" setup>
import InfoBlock from './components/InfoBlock.vue';
import InventoryGrid from './components/InventoryGrid.vue';
</script>

<template>
  <div class="container">
    <InfoBlock style="width: 30%;" />
    <InventoryGrid style="width: 69%"/>
  </div>
</template>

<style lang="scss">
.container {
  height: 100vh;
  background-color: $background_color;
  padding: 15px;
  display: flex;
  justify-content: space-between;
}
</style>
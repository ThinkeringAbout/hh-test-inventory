<script setup lang="ts">
import { ref } from "vue";
const emit = defineEmits(["delete-item", "cancel-delete"]);
let quantity = ref(1);

const handleDeleteConfirmClick = () => {
  emit("delete-item", quantity.value);
};

const handleDeleteCancelClick = () => {
  emit("cancel-delete");
};
</script>

<template>
  <div class="delete-form">
    <div style="width: 100%">
      <input
        v-model="quantity"
        placeholder="Введите количество"
        type="number"
        name=""
        id=""
      />
    </div>
    <div style="display: flex; justify-content: space-between; width: 100%">
      <button @click="handleDeleteCancelClick" class="cancel-button">
        Отмена
      </button>
      <button @click="handleDeleteConfirmClick" class="confirm-button">
        Подтвердить
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.delete-form {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  padding: 25px;
  gap: 25px;
  background: #272727;
  display: flex;
  flex-direction: column;
  input {
    width: 100%;
    padding: 20px 15px;
    font-size: 30px;
    border-radius: 4px;
    border: 1px solid $border_color;
    outline: none;
    background: none;
    color: #fff;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  button {
    padding: 20px 10px;
    width: 47%;
    font-size: 20px;
  }
  .confirm-button {
    background: $delete_color;
    border-radius: 8px;
    outline: none;
    border: none;
    color: #fff;
    cursor: pointer;
  }
  .cancel-button {
    background: #fff;
    border-radius: 8px;
    outline: none;
    border: none;
    color: #000;
    cursor: pointer;
  }
}
</style>

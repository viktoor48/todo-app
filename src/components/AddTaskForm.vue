<template>
  <form
    @submit="onSubmit"
    class="form p-2 my-4 border rounded-lg"
    id="task-form"
  >
    <input
      type="text"
      class="input outline-none"
      placeholder="Введите название"
      id="task-input"
      required
      v-model="newTaskName"
    />
    <button type="submit" class="text-base form__btn">Добавить</button>
    <button @click="closeForm" type="button" class="text-base form__btn">
      Отмена
    </button>
  </form>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const emit = defineEmits(["submit", "delete"]);
const newTaskName = ref("");

const onSubmit = () => {
  if (newTaskName.value.length !== 0) {
    emit("submit", newTaskName.value);
    newTaskName.value = "";
  }
};

const closeForm = () => {
  emit("cancel");
};
</script>
<style scoped></style>

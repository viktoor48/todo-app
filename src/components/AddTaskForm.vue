<template>
  <form class="form" id="task-form">
    <input
      type="text"
      class="input"
      placeholder="Введите название"
      id="task-input"
      required
      v-model="newTaskName"
    />
    <button @click="onSubmit" type="button" class="form__btn">Добавить</button>
    <button @click="closeForm" type="button" class="form__btn">Отмена</button>
  </form>
</template>

<script>
import { ref } from "vue";

export default {
  name: "AddTaskForm",
  setup(props, { emit }) {
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

    return {
      newTaskName,
      onSubmit,
      closeForm,
    };
  },
};
</script>

<style scoped></style>

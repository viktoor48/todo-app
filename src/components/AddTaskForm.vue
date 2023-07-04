<template>
  <form class="form p-2 my-4 border rounded-lg" id="task-form">
    <input
      type="text"
      class="input outline-none"
      placeholder="Введите название"
      id="task-input"
      required
      v-model="newTaskName"
    />
    <button @click="onSubmit" type="button" class="text-base form__btn">
      Добавить
    </button>
    <button @click="closeForm" type="button" class="text-base form__btn">
      Отмена
    </button>
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

<template>
  <li class="task-item">
    <div class="task-item__header">
      <div class="left-filed">
        <input
          @click="handleCheck(props.task)"
          :checked="props.task.checked"
          type="checkbox"
          class="task-item__checkbox mr-2"
        />
        <span
          :class="{ strikethrough: props.task.checked }"
          class="task-name font-medium"
          >{{ task.name }}</span
        >
      </div>
      <button @click="deleteTask(props.index)">Удалить</button>
    </div>
    <div class="task-item__footer">
      <div class="task-item__date">{{ props.task.date }}</div>
    </div>
  </li>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["handleCheck", "deleteTask"]);
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const handleCheck = (task) => {
  emit("handleCheck", task);
};

const deleteTask = (ind) => {
  emit("deleteTask", ind);
};
</script>

<style scoped></style>

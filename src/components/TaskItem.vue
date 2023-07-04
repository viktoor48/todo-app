<template>
  <li class="task-item">
    <div class="task-item__header">
      <div class="left-filed">
        <input
          @click="handleCheck(task)"
          :checked="task.checked"
          type="checkbox"
          class="task-item__checkbox mr-2"
        />
        <span
          :class="{ strikethrough: task.checked }"
          class="task-name font-medium"
          >{{ task.name }}</span
        >
      </div>
      <button @click="deleteTask(index)">Удалить</button>
    </div>
    <div class="task-item__footer">
      <div class="task-item__date">{{ task.date }}</div>
    </div>
  </li>
</template>

<script>
export default {
  name: "TaskItem",
  props: {
    task: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const handleCheck = (task) => {
      emit("handleCheck", task);
    };

    const deleteTask = (ind) => {
      emit("deleteTask", ind);
    };

    return {
      handleCheck,
      deleteTask,
    };
  },
  mounted() {
    console.log(this.task);
  },
};
</script>

<style scoped></style>

<template>
  <div class="wrapper">
    <div class="container">
      <div class="container">
        <div class="flex-container">
          <div class="div">
            <h1 class="text-4xl text-green-950">Список задач</h1>
          </div>
          <button @click="openForm" class="btn btn-add-task">
            Добавить задачу
          </button>
        </div>
        <AddTaskForm
          v-if="isOpenForm"
          @submit="onSubmit"
          @cancel="closeForm"
        ></AddTaskForm>
        <ul v-if="tasks.length > 0" class="task-list">
          <TaskItem
            v-for="(task, ind) in tasks"
            :key="ind"
            :index="ind"
            :task="task"
            @handleCheck="handleCheck"
            @deleteTask="deleteTask"
          ></TaskItem>
        </ul>
        <div v-else class="message-block">Список задач пуст</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { saveToLocalStorage, getFromLocalStorage } from "@/localstorage";
import { getCurrentDate } from "@/utils";
import AddTaskForm from "@/components/AddTaskForm";
import TaskItem from "@/components/TaskItem";

export default {
  name: "App",
  components: { AddTaskForm, TaskItem },
  setup() {
    const isOpenForm = ref(false);
    const tasks = ref(getFromLocalStorage("tasks") || []);

    const openForm = () => {
      isOpenForm.value = true;
    };

    const closeForm = () => {
      isOpenForm.value = false;
    };

    const onSubmit = (newTaskName) => {
      if (newTaskName.length !== 0) {
        tasks.value.push({
          name: newTaskName,
          checked: false,
          date: getCurrentDate(),
        });
        saveToLocalStorage("tasks", tasks.value);
      }
    };

    const handleCheck = (task) => {
      task.checked = !task.checked;
      saveToLocalStorage("tasks", tasks.value);
    };

    const deleteTask = (taskInd) => {
      tasks.value = tasks.value.filter((task, i) => {
        return i !== taskInd;
      });
      saveToLocalStorage("tasks", tasks.value);
    };

    return {
      isOpenForm,
      tasks,
      deleteTask,
      handleCheck,
      onSubmit,
      openForm,
      closeForm,
    };
  },
  mounted() {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

* {
  box-sizing: border-box;
}

.wrapper {
  width: 100%;
  height: 100%;
}

.container {
  max-width: 700px;
  margin: 0 auto;
}

.btn {
  padding: 5px;
  font-size: 16px;
  border: none;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
}

.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-list {
  width: 100%;
  list-style: none;
  padding: 0;
  margin-top: 30px;
}

.task-item {
  width: 100%;
  padding: 10px;
  border: 1px solid lightgrey;
  border-radius: 6px;
}

.task-item + .task-item {
  margin-top: 20px;
}

.task-item__header {
  display: flex;
  justify-content: space-between;
}

.task-item__footer {
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px solid lightgrey;
}

.task-item__date {
  display: flex;
  margin-left: 10px;
}

.task-name {
  margin-left: 10px;
}

.form {
  width: 100%;
  display: flex;
  padding-top: 20px;
}

.input {
  width: 100%;
  font-size: 16px;
  padding: 5px;
}

.form__btn {
  margin-left: 20px;
}

.strikethrough {
  text-decoration: line-through;
}

.message-block {
  margin-top: 40px;
}
</style>

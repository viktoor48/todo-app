<template>
  <div class="wrapper">
    <div class="container">
      <div class="container">
        <div class="flex-container">
          <div class="div">
            <h1>Список задач</h1>
          </div>
          <button @click="openForm" class="btn btn-add-task">
            Добавить задачу
          </button>
        </div>
        <form v-if="isOpenForm" class="form" id="task-form">
          <input
            type="text"
            class="input"
            placeholder="Введите название"
            id="task-input"
            required
            v-model="taskName"
          />
          <button @click="onSubmit" type="submit" class="form__btn">
            Добавить
          </button>
          <button @click="closeForm" type="submit" class="form__btn">
            Отмена
          </button>
        </form>
        <ul v-if="tasks.length > 0" class="task-list">
          <li v-for="(task, ind) in tasks" :key="ind" class="task-item">
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
              <button @click="deleteTask(ind)">Удалить</button>
            </div>
            <div class="task-item__footer">
              <div class="task-item__date">{{ task.date }}</div>
            </div>
          </li>
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

export default {
  name: "App",
  components: {},
  setup() {
    const isOpenForm = ref(false);
    const taskName = ref("");
    const tasks = ref(getFromLocalStorage("tasks") || []);

    const openForm = () => {
      isOpenForm.value = true;
    };

    const closeForm = () => {
      isOpenForm.value = false;
    };

    const onSubmit = () => {
      if (taskName.value.length !== 0) {
        tasks.value.push({
          name: taskName.value,
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
      taskName,
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

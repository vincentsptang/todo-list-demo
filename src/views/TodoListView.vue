<script setup>
import TodoList from '@/components/TodoList.vue'
import TodoForm from '@/components/TodoForm.vue'
import { ref } from 'vue'
import Todo from '@/models/Todo'
import { ElMessage } from 'element-plus'

// --- Data ---
const todoList = ref([])

// --- Methods ----

// Get todo list from sever
function getTodoList() {
  Todo.getTodoList()
    .then((data) => {
      todoList.value = data
    })
    .catch(() => {
      ElMessage({
        message: '获取Todo数据出错',
        type: 'error'
      })
    })
}

function onTodoCompleteChange(e) {
  const { id, status } = e
  const todo = todoList.value.find((t) => t.id == id)
  if (!todo) return
  todo.isCompleted = status
  todo.save()
}

function onDeleteTodo(id) {
  Todo.delete(id)
    .then(() => {
      getTodoList()
    })
    .catch(() => {
      ElMessage({
        message: '删除失败',
        type: 'error'
      })
    })
}

function onFormSaveSuccess() {
  getTodoList()
}

// --- Created ---
getTodoList()
</script>

<template>
  <div class="todo-list-view">
    <el-container>
      <el-header></el-header>
      <el-main>
        <todo-list
          :todoList="todoList"
          @complete-change="onTodoCompleteChange"
          @delete="onDeleteTodo"
        ></todo-list>
      </el-main>
    </el-container>
    <el-row class="todo-form clearfix">
      <el-col>
        <todo-form @save-success="onFormSaveSuccess"></todo-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.todo-form {
  width: 100%;
  padding: 2em;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>

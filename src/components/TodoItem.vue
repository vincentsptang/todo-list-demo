<script setup>
import { defineEmits, ref } from 'vue'

// --- Props ---
const { todo } = defineProps(['todo'])

// --- Data ---
const showOperations = ref(false)

// --- Emits ---
const emit = defineEmits(['completeChange', 'delete'])
</script>

<template>
  <div
    class="todo-item"
    @mouseenter.native="showOperations = true"
    @mouseleave="showOperations = false"
  >
    <el-row :gutter="20">
      <el-col :span="1"
        ><el-checkbox
          :checked="todo.isCompleted"
          @change="$emit('completeChange', { id: todo.id, status: $event })"
          date-todo-checkbox
        ></el-checkbox
      ></el-col>

      <el-col :span="14" class="todo-content">
        <del v-if="todo.isCompleted"
          ><span data-test-todo-content>{{ todo.content }}</span></del
        >
        <span v-else data-test-todo-content="">{{ todo.content }}</span>
      </el-col>

      <el-col v-show="showOperations" class="todo-operations" :span="9">
        <!-- <el-button v-if="!todo.isCompleted" @click="$emit('edit', todo)">修改</el-button> -->
        <el-button type="danger" @click="$emit('delete', todo.id)">删除</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.todo-item {
  border-top: 1px solid gainsboro;
}
.todo-item:last-child {
  border-bottom: 1px solid gainsboro;
}
.el-row {
  margin: 1em 0;
}

.el-col.todo-content {
  display: flex;
  align-items: center;
}

.el-col.todo-operations {
  text-align: right;
}
</style>

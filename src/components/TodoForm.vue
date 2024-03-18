<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import Todo from '@/models/Todo'

// --- Props ---

// --- Data ---
const isDirty = ref(false)
const isSaving = ref(false)
const todoContent = ref('')
//const todoDueAt = ref(new Date().getTime())

// --- Emits ---
const emit = defineEmits(['saveSuccess'])

// --- Events ---
function onInput(e: string) {
  if (e !== '') {
    isDirty.value = true
  } else {
    isDirty.value = false
  }
}

// --- Methods ---
function saveTodo() {
  isSaving.value = true
  ElMessage('正在保存...')
  const todo = Todo.create(todoContent.value, false)
  todo
    .save()
    .then(() => {
      emit('saveSuccess')
      todoContent.value = '' // reset form input
      isDirty.value = false // reset isDirty flag
      ElMessage({
        message: '保存成功',
        type: 'success'
      })
    })
    .catch(() => {
      ElMessage({
        message: '保存失败，请重试',
        type: 'error'
      })
    })
    .finally(() => {
      isSaving.value = false // reset isSaving flag
    })
}
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <el-input v-model="todoContent" @input="onInput" :disabled="isSaving"></el-input>
    </el-col>
    <el-col :span="6" class="todo-input-wrapper">
      <el-button type="primary" :disabled="!isDirty || isSaving" @click="saveTodo">保存</el-button>
    </el-col>
  </el-row>
</template>

<style scoped>
.todo-input-wrapper {
  text-align: center;
}

.todo-input-wrapper .el-button {
  width: 100%;
}
</style>

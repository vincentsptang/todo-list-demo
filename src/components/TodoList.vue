<script setup lang="ts">
import TodoItem from './TodoItem.vue'
import Todo from '@/models/Todo'
import { getDateGap, getRelativeDateTemporalName, isSameYear } from '@/utils/date'
import { computed, ref } from 'vue'

// --- Props ---
const props = defineProps({
  todoList: {
    type: Array<Todo>,
    default() {
      return []
    }
  }
})

// --- Data ---
interface TodoListDataWrapper {
  gap: number
  temporalName: string
  list: Todo[]
}

const activeCollapse = ref(0)

// --- Computed ---
const todoListByTemporalSection = computed(() => {
  return convertTodoList2Wrapper(props.todoList)
})

// --- Emits ---
defineEmits(['completeChange', 'delete'])

// --- Event handlers ---

// --- Created ---

// --- Methods ---

function displayDateOrTemporal(targetDate: Date, comparisonDate: Date): string {
  const temporal = getRelativeDateTemporalName(targetDate, comparisonDate)

  if (temporal !== null) return temporal

  if (isSameYear(targetDate, comparisonDate)) {
    return `${targetDate.getMonth() + 1}月${targetDate.getDate()}日`
  } else {
    return `${targetDate.getFullYear()}年${targetDate.getMonth() + 1}月${targetDate.getDate()}日`
  }
}

function convertTodoList2Wrapper(todoList: Todo[]) {
  const res: TodoListDataWrapper[] = []
  const now = new Date()
  todoList.forEach(function (todo) {
    const targetDate = new Date(todo.createdAt!)
    const gap = getDateGap(targetDate, now)
    const idx = res.findIndex((wrapper) => wrapper.gap === gap)
    if (idx === -1) {
      res.push({
        gap,
        temporalName: displayDateOrTemporal(targetDate, now),
        list: [todo]
      })
    } else {
      res[idx].list.push(todo)
    }
  })

  res.sort((first, second) => {
    return first.gap - second.gap
  })

  return res
}
</script>

<template>
  <div class="todo-list">
    <el-collapse v-if="todoList.length" v-model="activeCollapse" accordion>
      <el-collapse-item
        v-for="(data, index) in todoListByTemporalSection"
        :key="index"
        :title="data.temporalName"
        :name="data.gap"
      >
        <todo-item
          v-for="todo in data.list"
          :key="todo.id!"
          :todo="todo"
          @complete-change="$emit('completeChange', $event)"
          @delete="$emit('delete', $event)"
        ></todo-item>
      </el-collapse-item>
    </el-collapse>
    <el-empty v-else description="暂无TODO，添加一个吧！" />
  </div>
</template>

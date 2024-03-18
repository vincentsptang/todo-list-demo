<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { getRelativeDateTemporalName } from '@/utils/date'

// --- Props ---
const props = defineProps({
  targetTimestamp: {
    type: Number,
    required: true
  },
  comparisonTimestamp: {
    type: Number,
    required: true
  }
})

// --- Data ---
const temporalName = computed(() => {
  return getRelativeDateTemporalName(
    new Date(props.targetTimestamp),
    new Date(props.comparisonTimestamp)
  )
})

// --- Methods ---
</script>

<template>
  <span>{{ temporalName }}</span>
</template>

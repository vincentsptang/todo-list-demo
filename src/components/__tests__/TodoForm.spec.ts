import TodoForm from '../TodoForm.vue'
import { mount } from '@vue/test-utils'
import { ElButton, ElInput } from 'element-plus'
import { describe, it, expect } from 'vitest'

describe('TodoForm', () => {
  it('test TodoForm works properly', async () => {
    const wrapper = mount(TodoForm, {
      global: {
        plugins: [ElInput, ElButton]
      }
    })
    const elInput = wrapper.findComponent(ElInput)
    await elInput.setValue('test')
    elInput.vm.$emit('input')

    expect(wrapper.vm.isDirty).toBeTruthy()
    expect(wrapper.vm.todoContent).toBe('test')
  })
})

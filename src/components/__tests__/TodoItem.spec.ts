import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TodoItem from '../TodoItem.vue'

describe('TodoItem', () => {
  it('renders ToDoItem component properly', () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: {
          id: 1,
          content: 'test content',
          isCompleted: false,
          createdAt: Date.now(),
          modifiedAt: Date.now()
        }
      }
    })

    // test content
    expect(wrapper.get('[data-test-todo-content]').text()).toContain('test content')
  })
})

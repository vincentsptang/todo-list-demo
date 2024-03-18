import type { AxiosResponse } from 'axios'
import { deleteTodo, getTodoList, saveTodo } from '../apis/todos'

export default class Todo {
  id: number | null = null
  content = ''
  isCompleted = false
  // dueAt = new Date().getTime()
  createdAt: number | null = null
  modifiedAt: number | null = null

  constructor(id: number | null) {
    this.id = id

    // prevent id field to be modified after instance constructed.
    Object.defineProperty(this, 'id', {
      enumerable: true,
      set: (value) => {},
      get: () => id
    })
  }

  /**
   * Purpose: Save the todo data to server.
   */
  async save(): Promise<Todo> {
    return await saveTodo(this).then((response: AxiosResponse) => {
      const todo: Todo = response.data.data

      // for new Todo return new Instance.
      if (this.id === null) {
        const instance = new Todo(todo.id)
        Object.assign(instance, response.data.data)
        return instance
      }

      // for Todo already exists, return original instance.
      return this
    })
  }

  /**
   * Purpose: delete the todo data in server.
   * @param id NUMBER the Todo that id specified needs to be deleted.
   */
  static async delete(id: number): Promise<AxiosResponse> {
    return await deleteTodo(id)
  }

  /**
   * Purpose: Create a new Todo instance with content and isCompleted flag.
   * @param content todo content.
   * @param isCompleted is todo completed.
   * @returns a new Todo instance for later uses.
   */
  static create(content: string, isCompleted: boolean): Todo {
    const todo = new Todo(null)
    todo.content = content
    // todo.dueAt = typeof dueAt === 'number' ? dueAt : dueAt.getTime()
    todo.isCompleted = isCompleted
    return todo
  }

  /**
   * Purpose: Get all todo data from server.
   * @returns Array of todo instances.
   */
  static async getTodoList(): Promise<Todo[]> {
    return await getTodoList().then((response: AxiosResponse) => {
      return response.data.data.map((i: Todo) => {
        const instance = new Todo(i.id)
        Object.assign(instance, i)
        return instance
      })
    })
  }
}

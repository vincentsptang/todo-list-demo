import request from '@/lib/request/request'
import type Todo from '@/models/Todo'
import type { AxiosResponse } from 'axios'

const basePath = '/todos'

/**
 * Get todo list from server
 * @returns Promise of AxiosResponse
 */
export async function getTodoList(): Promise<AxiosResponse> {
  return await request.get(basePath)
}

/**
 * Delete the todo specified by id
 * @param id todo id in server
 * @returns
 */
export async function getTodo(id: number): Promise<AxiosResponse> {
  return await request.get(`${basePath}/${id}`)
}

/**
 * Create or update todo instance
 * @param todo Todo instance that needs to be created or updated.
 * @returns Promise of AxiosResponse
 */
export async function saveTodo(todo: Todo): Promise<AxiosResponse> {
  let path = ''
  if (todo.id === null) {
    // new Todo, request to create
    path = `${basePath}`
  } else {
    // Todo already exists, request to update
    path = `${basePath}/${todo.id}`
  }

  return await request.put(path, todo)
}

/**
 * Delete the todo specified by id
 * @param id todo id in server
 * @returns
 */
export async function deleteTodo(id: number): Promise<AxiosResponse> {
  return await request.delete(`${basePath}/${id}`)
}

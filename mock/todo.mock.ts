import { defineMock } from 'vite-plugin-mock-dev-server'

const now = new Date()
const ts = now.getTime()

interface Todo {
  id: number
  content: string
  isCompleted: boolean
  createdAt: number
  modifiedAt: number
}

const todoDb: Array<Todo | null> = [
  {
    id: 1,
    content: 'test1',
    isCompleted: false,
    createdAt: ts,
    modifiedAt: ts
  },
  {
    id: 2,
    content: 'test2',
    isCompleted: false,
    createdAt: ts + 24 * 3600000,
    modifiedAt: ts
  },
  {
    id: 3,
    content: 'test3',
    isCompleted: true,
    createdAt: ts + 2 * 24 * 3600000,
    modifiedAt: ts
  },
  {
    id: 4,
    content: 'test4',
    isCompleted: false,
    createdAt: ts + 3 * 24 * 3600000,
    modifiedAt: ts
  },
  {
    id: 5,
    content: 'test5',
    isCompleted: false,
    createdAt: ts - 24 * 3600000,
    modifiedAt: ts
  },
  {
    id: 6,
    content: 'test6',
    isCompleted: false,
    createdAt: ts - 2 * 24 * 3600000,
    modifiedAt: ts
  },
  {
    id: 7,
    content: 'test6',
    isCompleted: false,
    createdAt: ts - 3 * 24 * 3600000,
    modifiedAt: ts
  }
]

function queryById(id: number | string): number {
  if (typeof id === 'string') id = parseInt(id)
  return todoDb.findIndex((todo) => todo !== null && todo.id === id)
}

export default defineMock([
  {
    url: '/api/todos',
    response(req, res, next) {
      res.end(JSON.stringify({ data: todoDb.filter((t) => t !== null) }))
    }
  },
  {
    url: '/api/todos/:id',
    method: ['GET'],
    response(req, res, next) {
      const id: string = req.params.id
      const idx = queryById(id)
      if (idx !== -1) {
        const todo = todoDb[idx]
        res.end(
          JSON.stringify({
            data: todo
          })
        )
      } else {
        res.statusCode = 404
        res.end()
      }
    }
  },
  {
    url: '/api/todos',
    method: ['PUT'],
    response(req, res, next) {
      const id = todoDb.length + 1
      const todo = req.body
      const record: Todo = {
        content: '',
        isCompleted: false,
        ...todo,
        id,
        createdAt: new Date().getTime(),
        modifiedAt: new Date().getTime()
      }

      todoDb.push(record)
      res.statusCode = 200
      res.end(JSON.stringify({ data: todo }))
    }
  },
  {
    url: '/api/todos/:id',
    method: ['PUT'],
    response(req, res, next) {
      const id: string = req.params.id
      const idx = queryById(id)

      let todo: Todo | null = null

      if (idx !== -1) {
        todo = todoDb[idx]
      }

      if (todo !== null) {
        const d = req.body
        todo.content = d.content
        todo.isCompleted = d.isCompleted
        todo.modifiedAt = new Date().getTime()
        res.statusCode = 200
        res.end(JSON.stringify({ data: todo }))
      } else {
        res.statusCode = 404
        res.end()
      }
    }
  },
  {
    url: '/api/todos/:id',
    method: ['DELETE'],
    response(req, res, next) {
      const id: string = req.params.id
      const idx = queryById(id)

      if (idx !== -1) {
        todoDb[idx] = null
      }
      res.statusCode = 200
      res.end()
    }
  }
])

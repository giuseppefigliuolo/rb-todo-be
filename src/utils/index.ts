import { ITodo } from '../models/todo'

const fs = require('fs')

const filePath = 'todos.json'

export const loadTodos = async (): Promise<ITodo[]> => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]')
    }
    const dataBuffer = fs.readFileSync(filePath)
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    console.log(e)
    return []
  }
}

export const saveTodos = async (todo: ITodo) => {
  fs.readFile(
    filePath,
    'utf8',
    (err: NodeJS.ErrnoException | null, data: string) => {
      if (err) {
        console.error('Error reading the file:', err)
        return
      }

      try {
        const jsonArray: ITodo[] = JSON.parse(data)

        jsonArray.push(todo)

        fs.writeFile(
          filePath,
          JSON.stringify(jsonArray, null, 2),
          'utf8',
          (err: NodeJS.ErrnoException | null) => {
            if (err) {
              console.error('Error writing to the file:', err)
              return
            }
            console.log(
              'Successfully added the new object and updated the file!'
            )
          }
        )
      } catch (parseError) {
        console.error('Error parsing JSON data:', parseError)
      }
    }
  )
}

export const isValidTodo = (data: unknown): boolean => {
  if (typeof data !== 'object' || data === null) {
    return false
  }

  const { id, title, description, completed } = data as ITodo

  if (typeof id !== 'string' || id.trim() === '') {
    return false
  }

  if (typeof title !== 'string' || title.trim() === '') {
    return false
  }

  if (description !== undefined && typeof description !== 'string') {
    return false
  }

  if (typeof completed !== 'boolean') {
    return false
  }

  return true
}

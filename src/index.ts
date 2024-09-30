import { Request, Response } from 'express'
import { isValidTodo, loadTodos, saveTodos } from './utils'

// require dependencies so they can be used throughout this code
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// enable CORS so the frontend can make requests to this server
app.use(cors())

// GET endpoint to fetch all todo items
app.get('/todos', async (_req: any, res: any) => {
  const todos = await loadTodos()
  res.json(todos)
})

// POST endpoint to create a new todo item
app.post('/todos', async (req: Request, res: Response) => {
  try {
    if (!req.body || !isValidTodo(req.body)) {
      return res.status(400).json({ error: 'Invalid todo structure' })
    }
    await saveTodos(req.body)
    res.status(201).json({ message: 'Todo created' })
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'Failed to create todo' })
  }
})

// PUT endpiont to update an existing todo item with the specified `id`
// provide updated `title` and/or `completed` in the request body as JSON
/* app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const todo = todos.find((t) => t.id === id)
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' })
  }
  todo.title = req.body.title || todo.title
  todo.completed = req.body.completed || todo.completed
  res.json(todo)
}) */

// DELETE endpoint to remove an existing todo item with the specified `id`
/* app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = todos.findIndex((t) => t.id === id)
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' })
  }
  todos.splice(index, 1)
  res.status(204).send()
}) */

// run the server on port 3000
// for example the app can run locally at this URL: http://localhost:3000
const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

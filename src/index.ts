import { Request, Response } from 'express'
import {
  deleteTodo,
  isValidTodo,
  loadTodos,
  saveTodos,
  updateTodo
} from './utils'

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

// DELETE endpoint to remove an existing todo item with the specified `id`
app.delete('/todos/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    await deleteTodo(id)
    res.status(204).send()
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'Failed to delete todo' })
  }
})

// PUT endpiont to update an existing todo item with the specified `id`
app.put('/todos/:id', async (req: Request, res: Response) => {
  try {
    if (!req.body || !isValidTodo(req.body)) {
      return res.status(400).json({ error: 'Invalid todo structure' })
    }
    const id = req.params.id

    await updateTodo(id, req.body)
    res.status(201).json({ message: 'Todo updated' })
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'Failed to update todo' })
  }
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

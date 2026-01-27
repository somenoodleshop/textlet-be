import cors from 'cors'
import express from 'express'
import healthcheck from 'express-healthcheck'
import helmet from 'helmet'

import * as comment from './resource/comment.js'

const { PORT = 80 } = process.env

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(healthcheck())

app.get('/v1/comment', comment.read)
app.post('/v1/comment', comment.write)

app.get('/v1/protected', (req, res) => {
  res.json({ message: 'Hello, world!' })
})

app.use('*', (req, res) => res.sendStatus(404))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

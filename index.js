import express from 'express'
import morgan from 'morgan'
import path from 'path'
import socketIO from 'socket.io'

const app = express()

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(morgan('dev'))

app.get('/', (request, response) => {
  response.render('index')
})

let server = app.listen(3000, () => {
  console.log('Listen port: 3000')
})

let io = socketIO(server)

io.on('connection', (socket) => {
  console.log('user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  socket.on('message', (message) => {
    console.log(message)
    io.emit('message',message)
  })
})

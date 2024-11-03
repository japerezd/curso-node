const express = require('express')
const ditto = require('./pokemon/ditto.json')
const app = express()

// para que no salga la cabecera de express (recomendado quitarlo)
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

// Nuestro middleware
app.use((req, res, next) => {
  console.log('primer middleware')
  // trackear la request a base de datos
  // revisar si el usuario tiene cookies

  // no olvidar next para que continue la peticion
  next()
})

app.get('/pokemon/ditto', (req, res) => {
  // res.status(200).send('<h1>Mi página</h1>')
  // res.send('<h1>Mi página</h1>')
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  let body = ''

  // Escuchar el evento data
  // el data viene por trozos (imaginar agua en tuberia)
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    res.status(201).json(data)
  })
})

// *use* debe ser la ultima
// *use* es generico para POST, GET, DELETE etc...
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})

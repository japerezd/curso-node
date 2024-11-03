const express = require('express')
const ditto = require('./pokemon/ditto.json')
const app = express()

// para que no salga la cabecera de express (recomendado quitarlo)
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

// Se usa este en lugar de la logica de nuestro middleware desde 0
// app.use(express.json())

// Nuestro middleware
app.use((req, res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  // Solo llegan peticiones POST y con header Content-type: application/json
  let body = ''

  // Escuchar el evento data
  // el data viene por trozos (imaginar agua en tuberia)
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    // mutar la request y meter la informacion en el req.body
    // la request es una para cada peticion
    // objeto unico para cada peticion
    req.body = data
    // no olvidar next para que continue la peticion
    next()
  })
})

app.get('/pokemon/ditto', (req, res) => {
  // res.status(200).send('<h1>Mi página</h1>')
  // res.send('<h1>Mi página</h1>')
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  // req.body deberiamos guardar en base de datos
  res.status(201).json(req.body)
})

// *use* debe ser la ultima
// *use* es generico para POST, GET, DELETE etc...
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})

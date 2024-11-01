const http = require('node:http') // protocolo http
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    // Por defecto manda statusCode 200 si no se manda uno
    res.statusCode = 200 // OK
    res.end('<h1>Mi página</h1>')
  } else if (req.url === '/imagen-super-bonita.png') {
    // leyendo imagen
    fs.readFile('./200.png', (err, data) => {
      if (err) {
        res.statusCode = 500 // Internal server error
        res.end('<h1>500 Internal Server Error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.end('<h1>Contacto</h1>')
  } else {
    res.statusCode = 400 // Not found
    res.end('<h1>404</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})

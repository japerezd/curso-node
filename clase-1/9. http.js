const http = require('node:http')
const { findAvailablePort } = require('./10. free-port')

// Podemos ejecutarlo asi en la terminal:
// PORT=1234 node 9.\ http.js
const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('Request received')
  res.end('Hola mundo')
})

findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
  })
})

// 0 -> toma aleatoriamente un puerto que este disponible
// server.listen(0, () => {
//   console.log(`server listening on port http://localhost:${server.address().port}`)
// })

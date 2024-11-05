const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const { validateMovie } = require('./schemas/movies')

const app = express()
// Middleware para obtener el body de la petición
app.use(express.json())
// deshabilita el header X-Powered-By: Express
app.disable('x-powered-by')

// Todos los recursos que sean MOVIES se identifica con /movies
app.get('/movies', (req, res) => {
  const { genre, limit } = req.query
  if (genre) {
    const filteredMovies = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLocaleLowerCase()))
    const limitedMovies = filteredMovies.slice(0, limit)
    console.log('gg', { limitedMovies, limit })
    return res.json({ length: limitedMovies.length, ...limitedMovies })
  }

  if (limit) { 
    const limitedMovies = movies.slice(0, limit)
    return res.json({ length: limitedMovies.length, ...limitedMovies })
  }
  res.json(movies)
})

// path-to-regexp
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)

  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  // Guardar en base de datos
  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    ...result.data
  };
  /*Esto no seria REST, porque estamos guardando 
    el estado de la aplicación en memoria
  */
 movies.push(newMovie)
 res.status(201).json(newMovie)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})

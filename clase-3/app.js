const express = require('express')
const movies = require('./movies.json')

const app = express()
// deshabilita el header X-Powered-By: Express
app.disable('x-powered-by')

// Todos los recursos que sean MOVIES se identifica con /movies
app.get('/movies', (req, res) => {
  const { genre, page } = req.query
  if (genre) {
    const filteredMovies = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLocaleLowerCase()))
    return res.json({ length: filteredMovies.length, ...filteredMovies })
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

// app.get('/movies?page', (req, res) => {
//   const { page } = req.query
//   const movie = movies.find(movie => movie.id === id)

//   if (movie) return res.json(movie)

//   res.status(404).json({ message: 'Movie not found' })
// })

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})

const express = require('express')
const app = express()
const port = 3000

const favMovieList = ['Scent of a Woman', 'Equalizer'];
const today = new Date();
const todayShorter = today.toLocaleDateString();
const movieString = favMovieList.join(', ') 
let queryParamNewMovie;

let firstName = "Initial Value"

app.get('/', (req, res) => {
    console.log('default route');
  res.send(`Hello, JG. Today is ${todayShorter}.`);
})

app.get('/list-movies', (req, res) => {
  console.log('list-movies route');
  const movieString = favMovieList.join(', ') 
  console.log(movieString);

res.send(`Favorite Movies: ${movieString}`);
})

// Part 2 
app.get('/add-movie', (req, res) => {
console.log('add-movie route');
queryParamNewMovie = req.query.newMovie
favMovieList.push(queryParamNewMovie)
console.log(favMovieList);
console.log(queryParamNewMovie);
res.json(`Add Movie: ${queryParamNewMovie}`)
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
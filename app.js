const express = require('express')
const app = express()
const port = 3000

const favMovieList = ['Scent of a Woman', 'Equalizer'];
const today = new Date();
const movieString = `${favMovieList[0]}, ${favMovieList[1]}` 

console.log(movieString);

app.get('/', (req, res) => {
    console.log('default route');
  res.send(`Hello, John G. Today's date is ${today}.`);
})

app.get('/list-movies', (req, res) => {
  console.log('list-movies route');
res.send(`${movieString}`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
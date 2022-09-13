const express = require("express");
// brings in body parser so we can parse the POST request body
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// parse application
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

/////////////////////
/// global variables
////////////////////

const favMovieList = [
  {
    title: "Scent of a Woman",
    starRating: 5,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date(),
  },
  {
    title: "Equalizer",
    starRating: 5,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date(),
  },
];
const today = new Date();
const todayShorter = today.toLocaleDateString();
const movieString = favMovieList.join(", ");
let queryParamNewMovie;
let firstName = "Initial Value";

////////////////////
/// default route
////////////////////

app.get("/", (req, res) => {
  console.log("default route");
  res.send(`Hello, JG. Today is ${todayShorter}.`);
});

/////////////////
// create
////////////////

// post a new movie into the movies array
app.post("/new-movie", (req, res) => {
  console.log("POST to /new-movie");

  // we'll use req.body to get the body payload from the post request that contains our new movie
  console.log(req.body);

  const newMovie = {
    title: "",
    starRating: 0,
    isRecommended: false,
    createdAt: new Date(),
    lastModified: new Date(),
  };

  newMovie.title = req.body.title;
  newMovie.starRating = req.body.starRating;

  if (req.body.title === undefined) {
    console.log("title is not defined");
    res.json({
      success: false,
      message: "title is a required field",
    });
    return;
  } else {
    console.log("title is defined");
    newMovie.title = req.body.title;
  }

  if (req.body.starRating === undefined) {
    console.log("starRating is not defined");
    res.json({
      success: false,
      message: "starRating is a required field",
    });
    return;
  } else {
    console.log("starRating is defined");
    newMovie.starRating = req.body.starRating;
  }

  if (req.body.isRecommended === undefined) {
    console.log("isRecommended is not defined");
    res.json({
      success: false,
      message: "isRecommended is a required field",
    });
    return;
  } else {
    console.log("isRecommended is defined");
    newMovie.isRecommended = req.body.isRecommended;
  }

  console.log("newMovie", newMovie);

  favMovieList.push(newMovie);

  // we must respond to the request, so for now we'll send back a hardcoded object
  res.json({
    success: true,
  });
});

//////////////////
// read
//////////////////

// get all the movies in our movie list

console.log("GET to /all-movies");

app.get("/all-movies", (req, res) => {
  // res.send only sends strings. From now on, we want to use res.json to send JSON objects or JS arrays.
  res.json(favMovieList);
});

app.get("/list-movies", (req, res) => {
  console.log("list-movies route");
  const movieString = favMovieList.join(", ");
  console.log(movieString);

  res.send(`Favorite Movies: ${movieString}`);
});

app.get("/add-movie", (req, res) => {
  console.log("add-movie route");
  queryParamNewMovie = req.query.newMovie;
  favMovieList.push(queryParamNewMovie);
  console.log(favMovieList);
  console.log(queryParamNewMovie);
  res.json(`Add Movie: ${queryParamNewMovie}`);
});

// finding single movie
app.get('/single-movie/:titleToFind', (req, res) => {
const titleToFind = req.params.titleToFind

const foundMovieIndex = favMovieList.findIndex((movie)=> {

  if (movie.title === req.params.titleToFind) {
    console.log("Movie titles match!");
    return true;
  } else {
    console.log("Movie titles do not match!");
    return false;
  }
})

const foundMovie = favMovieList[foundMovieIndex]

res.json(foundMovie)
})

//////////////
//update
/////////////

// find a movie and update the title
app.put("/update-movie/:titleToUpdate", (req, res) => {
  console.log("PUT to /update-movie");

  // we have a route parameter to specify which movie in our list to update
  // the value of this route parameter will come through the req.params object
  console.log("req.params ", req.params);

  const titleToUpdate = req.params.titleToUpdate;

  const originalMovieIndex = favMovieList.findIndex((movie) => {
    console.log("movie", movie);

    if (movie.title === req.params.titleToUpdate) {
      console.log("Movie titles match!");
      return true;
    } else {
      console.log("Movie titles do not match!");
      return false;
    }
  });

  console.log("originalMovieIndex", originalMovieIndex);

  const originalMovie = favMovieList[originalMovieIndex];

  const updateMovie = {
    title: originalMovie.title,
    starRating: originalMovie.starRating,
    isRecommended: originalMovie.isRecommended,
    createdAt: originalMovie.createdAt,
    lastModified: new Date(),
  };

  if (req.body.title !== undefined) {
    updateMovie.title = req.body.title;
  }

  if (req.body.starRating !== undefined) {
    updateMovie.starRating = req.body.starRating;
  }

  if (req.body.isRecommended !== undefined) {
    updateMovie.isRecommended = req.body.isRecommended;
  }

  console.log("updateMovie after update", updateMovie);

  favMovieList[originalMovieIndex] = updateMovie;

  res.json({
    success: true,
  });
});

//////////////
// delete
////////////

app.delete("/delete-movie/:titleToDelete", (req, res) => {
  console.log("DELETE to /delete-movie");

  // find the index of the movie in the movie list
  const indexOfMovie = favMovieList.findIndex((movie) => {


    if (movie.title === req.params.titleToDelete) {
      console.log("Movie titles match!");
      return true;
    } else {
      console.log("Movie titles do not match!");
      return false;
    }
  });

  console.log(indexOfMovie);

  if (indexOfMovie < 0) {
    res.json({
      hasBeenDeleted: false,
    });
    return;
  }

  console.log("Before Delete", favMovieList);
  // remove the movie title from the array of the index
  favMovieList.splice(indexOfMovie, 1);
  console.log("After delete", favMovieList);

  res.json({
    hasBeenDeleted: true,
  });
});

//////////////
// app.listen
/////////////

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const movies = require("../model/filmes.json")
const fs = require('fs');

exports.getFilms = (req, res) => {
  console.log(req.url)
  res.status(200).send(movies)
}

exports.getFilmsByDirector = (req, res) => {
  const { director } = req.params;
  const listFilms = movies.filter(e => e.director == director)
  if (listFilms.length === 0) {
    return res.status(500).json({ message: "The director does not exist" });
  }
  return res.status(200).send(listFilms);
}

exports.getFilmsByGenre = (req, res) => {
  const choosenGenre = req.params.genre
  //const listFilms = movies.filter(e => e.genre.includes(choosenGenre))
  let listFilms = [];
  for(let i=0; i < movies.length; i+=1) {
    for(let j=0; j < movies[i].genre.length; j+=1) {
      if ( movies[i].genre[j] === choosenGenre) {
        listFilms.push(movies[i]);
      }
    }
  }
  if (listFilms.length === 0) {
    return res.status(500).json({ message: "The genre does not exist" });
  }

  res.status(200).send(listFilms);
}

exports.postFilms = (req, res) => { 
  const { title, year, director, duration, genre, rate } = req.body;
  movies.push({ title, year, director, duration, genre, rate });

  fs.writeFile("./src/model/filmes.json", JSON.stringify(movies), 'utf8', function (err) {
    if (err) {
      return res.status(500).send({ message: err });
    }
    console.log("The file was saved!");
  }); 

  return res.status(201).send(movies);
}

exports.postGenderInExistentMovies = (req, res) => {
  const { movie } = req.params;
  const film = movies.find(e => e.title == movie)
  if (!film) {
    return res.status(500).json({ message: "The movie does not exist" });
  }
  const { genre } = req.body;
  film.genre.push(genre);
  
  fs.writeFile("./src/model/filmes.json", JSON.stringify(movies), 'utf8', function (err) {
    if (err) {
        return res.status(500).send({ message: err });
    }
    console.log("The file was saved!");
  });

  res.status(201).send(movies);
}  

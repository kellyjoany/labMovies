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

exports.getFilmsByDuration = (req, res) => {
  const { duration } = req.params;
  const listFilms = turnHoursToMinutes();
  const durationFilms = listFilms.filter(e => e.duration > duration)

  return res.status(200).send(durationFilms)
}

exports.getHowDirectorGenderMovies = (req, res) => {
  const { director, genre } = req.params;
  const filmsByDirector = movies.filter(e => e.director == director)
  if (filmsByDirector.length === 0) {
    return res.status(500).json({ message: "The director does not exist" });
  }
  const filmsByDirectorAndGenre = filmsByDirector.filter(e => e.genre.includes(genre))
  if (filmsByDirectorAndGenre.length === 0) {
    return res.status(500).json({ message: "The genre does not exist" });
  }
  return res.status(200).send(filmsByDirectorAndGenre);
}

exports.postFilms = (req, res) => { 
  const { title, year, director, duration, genre, rate } = req.body;
  movies.push({ title, year, director, duration, genre, rate });

  saveFile();

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
  
  saveFile();

  res.status(201).send(movies);
}

exports.postImageExistentMovie = (req, res) => {
  const { movie } = req.params;
  const film = movies.find(e => e.title == movie)
  if (!film) {
    return res.status(500).json({ message: "The movie does not exist" });
  }
  const { image } = req.body;
  film.image = image;
  
  saveFile();
  
  res.status(201).send(movies);
}

exports.postMovieSessions = (req, res) => {
  const { movie } = req.params;
  const film = movies.find(e => e.title == movie)
  if (!film) {
    return res.status(500).json({ message: "The movie does not exist" });
  }
  const { showTime } = req.body;
  film.showTime = showTime;
  
  saveFile();
  
  res.status(201).send(movies);
}

function saveFile() {
  fs.writeFile("./src/model/filmes.json", JSON.stringify(movies), 'utf8', function (err) {
    if (err) {
        return res.status(500).send({ message: err });
    }
    console.log("The file was saved!");
  });
}

function turnHoursToMinutes() {
  const newMovieList = JSON.parse(JSON.stringify(movies));
  return newMovieList.map(e => { 
      let dr = e.duration.split('h');
      if (dr[0] !== '') {
          dr[0] = parseInt(dr[0]) * 60;
      }
      if (dr[1] === '') {
          dr[1] = '0';
      }
      dr[1] = parseInt(dr[1].split('min')[0])
      e.duration = dr[0] + dr[1];
      return e;
  });
}



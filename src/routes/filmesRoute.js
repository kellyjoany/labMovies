const express = require("express")
const router = express.Router()
const controller = require("../controllers/filmesController")

router.get("/", controller.getFilms)
router.get("/:director", controller.getFilmsByDirector)
router.get("/genero/:genre", controller.getFilmsByGenre)
router.get("/duration/:duration", controller.getFilmsByDuration)
router.get("/:director/:genre", controller.getHowDirectorGenderMovies)
router.post("/", controller.postFilms)
router.post("/:movie/", controller.postGenderInExistentMovies)
router.post("/:movie/image", controller.postImageExistentMovie)
router.post("/:movie/sessions", controller.postMovieSessions)

module.exports = router

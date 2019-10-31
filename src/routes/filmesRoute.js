const express = require("express")
const router = express.Router()
const controller = require("../controllers/filmesController")

router.get("/", controller.getFilms)
router.get("/:director", controller.getFilmsByDirector)
router.get("/genero/:genre", controller.getFilmsByGenre)
router.post("/", controller.postFilms)
router.post("/:movie/", controller.postGenderInExistentMovies)

module.exports = router

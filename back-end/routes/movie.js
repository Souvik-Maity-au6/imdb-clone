const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const Actor = require("../models/Actor");
const Producer = require("../models/Producer");
const auth = require("../middleware/auth");

router.get("/movies", auth, async (req, res) => {
  const movies = await Movie.find().populate("actors").populate("producer");
  res.send(movies);
});

router.post("/movies", auth, async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.status(201).send(movie);
});

router.put("/movies/:id", auth, async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(movie);
});

router.delete("/movies/:id", auth, async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

router.get("/actors", auth, async (req, res) => {
  const actors = await Actor.find();
  res.send(actors);
});

router.post("/actors", auth, async (req, res) => {
  const actor = new Actor(req.body);
  await actor.save();
  res.status(201).send(actor);
});

router.get("/producers", auth, async (req, res) => {
  const producers = await Producer.find();
  res.send(producers);
});

router.post("/producers", auth, async (req, res) => {
  const producer = new Producer(req.body);
  await producer.save();
  res.status(201).send(producer);
});

module.exports = router;

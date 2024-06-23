import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl, getMovies, updateMovie } from "../redux/actions/movieActions";
import "./AddMovie.css";
import "./Modal.css";
import "./MovieList.css";
Modal.setAppElement("#root");
const MovieList = ({ getMovies, movies, updateMovie }) => {
  let navigate = useNavigate();
  const [editModal, setEditModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    yearOfRelease: "",
    plot: "",
    poster: "",
    actors: [],
    producer: "",
  });
  const [allActors, setAllActors] = useState([]);
  const [allProducers, setAllProducers] = useState([]);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  useEffect(() => {
    const fetchActorsAndProducers = async () => {
      const actorsRes = await axios.get(baseUrl + "/api/actors");
      const producersRes = await axios.get(baseUrl + "/api/producers");
      setAllActors(actorsRes.data);
      setAllProducers(producersRes.data);
    };
    fetchActorsAndProducers();
    getMovies();
  }, [getMovies, editModal]);

  const onSubmit = (e) => {
    e.preventDefault();
    updateMovie(formData.id, formData);
    setEditModal(false);
  };

  const { name, yearOfRelease, plot, poster, actors, producer } = formData;

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="movie-list-container">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Movie List</h1>
        <button
          style={{
            marginLeft: "60%",
          }}
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <Link to="/add-movie">
        <button>Add Movie</button>
      </Link>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <img alt={"Poster"} src={movie.poster} width={100} height={100} />
            <h2>{movie.name}</h2>
            <p>Year of Release: {movie.yearOfRelease}</p>
            <p>Producer: {movie.producer.name}</p>
            <p>Actors: {movie.actors.map((actor) => actor.name).join(", ")}</p>
            <button
              onClick={() => {
                const movieData = {
                  id: movie._id,
                  name: movie.name,
                  yearOfRelease: movie.yearOfRelease,
                  plot: movie.plot,
                  poster: movie.poster,
                  actors: movie.actors.map((item) => item._id),
                  producer: movie.producer._id,
                };
                setFormData(movieData);
                setEditModal(true);
              }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={editModal}
        onRequestClose={() => setEditModal(false)}
        contentLabel="Edit Movie"
        className="modal"
      >
        <div className="modal-content">
          <div className="add-movie-container">
            <h2>Edit Movie</h2>
            <form onSubmit={onSubmit}>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <label>Year of Release</label>
                <input
                  type="number"
                  name="yearOfRelease"
                  value={yearOfRelease}
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <label>Plot</label>
                <textarea
                  name="plot"
                  value={plot}
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <label>Poster</label>
                <input
                  type="text"
                  name="poster"
                  value={poster}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="add-button-container">
                <label>Actors</label>
                <select
                  required
                  multiple
                  name="actors"
                  value={actors}
                  onChange={(e) => {
                    const option = e.target.value;

                    const tempData = { ...formData };
                    const actorsArray = [...tempData.actors];
                    const actorIndex = actorsArray.findIndex(
                      (item) => item === option
                    );
                    if (actorIndex === -1) {
                      actorsArray.push(option);
                    } else {
                      actorsArray.splice(actorIndex, 1);
                    }
                    tempData.actors = actorsArray;
                    setFormData({ ...tempData });
                  }}
                >
                  {allActors.map((actor) => (
                    <option key={actor._id} value={actor._id}>
                      {actor.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="add-button-container">
                <label>Producer</label>
                <select
                  name="producer"
                  value={producer}
                  onChange={onChange}
                  required
                >
                  {allProducers.map((producer) => (
                    <option key={producer._id} value={producer._id}>
                      {producer.name}
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={onSubmit}>Update Movie</button>
            </form>
            <button onClick={() => setEditModal(false)}>Close</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  movies: state.movies.movies,
});

export default connect(mapStateToProps, { getMovies, updateMovie })(MovieList);

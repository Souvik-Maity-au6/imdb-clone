import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "react-modal";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMovie, baseUrl } from "../redux/actions/movieActions";
import "./AddMovie.css";
import "./Modal.css";

Modal.setAppElement("#root");
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const AddMovie = ({ addMovie, history }) => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    yearOfRelease: "",
    plot: "",
    poster: "",
    actors: [],
    producer: "",
  });

  const [actorData, setActorData] = useState({
    name: "",
    gender: "",
    dob: "",
    bio: "",
  });

  const [producerData, setProducerData] = useState({
    name: "",
    gender: "",
    dob: "",
    bio: "",
  });

  const [allActors, setAllActors] = useState([]);
  const [allProducers, setAllProducers] = useState([]);

  const [isActorModalOpen, setActorModalOpen] = useState(false);
  const [isProducerModalOpen, setProducerModalOpen] = useState(false);

  useEffect(() => {
    const fetchActorsAndProducers = async () => {
      const actorsRes = await axios.get(baseUrl + "/api/actors");
      const producersRes = await axios.get(baseUrl + "/api/producers");
      setAllActors(actorsRes.data);
      setAllProducers(producersRes.data);
    };
    fetchActorsAndProducers();
  }, []);

  const { name, yearOfRelease, plot, poster, actors, producer } = formData;
  const { actorName, actorGender, actorDob, actorBio } = actorData;
  const { producerName, producerGender, producerDob, producerBio } =
    producerData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onActorChange = (e) =>
    setActorData({ ...actorData, [e.target.name]: e.target.value });
  const onProducerChange = (e) =>
    setProducerData({ ...producerData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addMovie(formData);
    navigate("/movies");
  };

  const addNewActor = async () => {
    const res = await axios.post(baseUrl + "/api/actors", actorData);
    setAllActors([...allActors, res.data]);
    setActorData({ name: "", gender: "", dob: "", bio: "" });
    setActorModalOpen(false);
  };

  const addNewProducer = async () => {
    const res = await axios.post(baseUrl + "/api/producers", producerData);
    setAllProducers([...allProducers, res.data]);
    setProducerData({ name: "", gender: "", dob: "", bio: "" });
    setProducerModalOpen(false);
  };

  return (
    <div className="add-movie-container">
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
          <textarea name="plot" value={plot} onChange={onChange} required />
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
          <FaPlus
            onClick={() => setActorModalOpen(true)}
            style={{ cursor: "pointer", marginLeft: "10px" }}
          />
        </div>
        <div className="add-button-container">
          <label>Producer</label>
          <select name="producer" value={producer} onChange={onChange} required>
            {allProducers.map((producer) => (
              <option key={producer._id} value={producer._id}>
                {producer.name}
              </option>
            ))}
          </select>
          <FaPlus
            onClick={() => setProducerModalOpen(true)}
            style={{ cursor: "pointer", marginLeft: "10px" }}
          />
        </div>
        <button type="submit">Add Movie</button>
      </form>

      <Modal
        isOpen={isActorModalOpen}
        onRequestClose={() => setActorModalOpen(false)}
        contentLabel="Add Actor"
        className="modal"
      >
        <div className="modal-content">
          <h2>Add New Actor</h2>
          <input
            required
            type="text"
            name="name"
            placeholder="Name"
            value={actorName}
            onChange={onActorChange}
          />
          <input
            required
            type="text"
            name="gender"
            placeholder="Gender"
            value={actorGender}
            onChange={onActorChange}
          />
          <input
            required
            type="date"
            name="dob"
            placeholder="DOB"
            value={actorDob}
            onChange={onActorChange}
          />
          <textarea
            required
            name="bio"
            placeholder="Bio"
            value={actorBio}
            onChange={onActorChange}
          />
          <button
            onClick={addNewActor}
            disabled={
              !actorData.name ||
              !actorData.gender ||
              !actorData.dob ||
              !actorData.bio
            }
            style={{
              backgroundColor:
                !actorData.name ||
                !actorData.gender ||
                !actorData.dob ||
                !actorData.bio
                  ? "grey"
                  : "blue",
            }}
          >
            Add Actor
          </button>
          <button onClick={() => setActorModalOpen(false)}>Close</button>
        </div>
      </Modal>

      <Modal
        isOpen={isProducerModalOpen}
        onRequestClose={() => setProducerModalOpen(false)}
        contentLabel="Add Producer"
        className="modal"
      >
        <div className="modal-content">
          <h2>Add New Producer</h2>
          <input
            required
            type="text"
            name="name"
            placeholder="Name"
            value={producerName}
            onChange={onProducerChange}
          />
          <input
            required
            type="text"
            name="gender"
            placeholder="Gender"
            value={producerGender}
            onChange={onProducerChange}
          />
          <input
            required
            type="date"
            name="dob"
            placeholder="DOB"
            value={producerDob}
            onChange={onProducerChange}
          />
          <textarea
            required
            name="bio"
            placeholder="Bio"
            value={producerBio}
            onChange={onProducerChange}
          />
          <button
            onClick={addNewProducer}
            disabled={
              !producerData.name ||
              !producerData.gender ||
              !producerData.dob ||
              !producerData.bio
            }
            style={{
              backgroundColor:
                !producerData.name ||
                !producerData.gender ||
                !producerData.dob ||
                !producerData.bio
                  ? "grey"
                  : "blue",
            }}
          >
            Add Producer
          </button>
          <button onClick={() => setProducerModalOpen(false)}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default connect(null, { addMovie })(AddMovie);

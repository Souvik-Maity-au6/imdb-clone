import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../redux/actions/movieActions";

const Signup = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(baseUrl + "/api/signup", formData);
      toast.success("Account created !", {
        position: "top-center",
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.user);
      navigate("/movies");
    } catch (err) {
      toast.error("Email already registered try login", {
        position: "top-center",
      });
      console.error(err.response);
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
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
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
};

export default Signup;

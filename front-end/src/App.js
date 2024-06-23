import React from "react";
import { Provider } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import AddMovie from "./components/AddMovie";
import Login from "./components/Login";
import MovieList from "./components/MovieList";
import Signup from "./components/Signup";
import store from "./redux/store";

const PrivateRoute = ({ children }) => {
  const authed = localStorage.getItem("token"); // isauth() returns true or false based on localStorage

  return authed ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route
              exact
              path="/movies"
              element={
                <PrivateRoute>
                  <MovieList />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/add-movie"
              element={
                <PrivateRoute>
                  <AddMovie />
                </PrivateRoute>
              }
            />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;

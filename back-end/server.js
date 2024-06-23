const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./routes/user");
const movieRoutes = require("./routes/movie");

const app = express();
const PORT = process.env.PORT || 5000;
mongoose.connect("mongodb://127.0.0.1:27017/imdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db = mongoose.connection;
db.once("open", function () {
  console.log("Db connnected");
});
db.on("error", function (err) {
  console.error(err);
});

app.use(cors());
app.use(bodyParser.json());

app.use("/api", userRoutes);
app.use("/api", movieRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;
const app = express();
// Middleware
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";

mongoose.connect(MONGODB_URI, {
  userNewUrlParser: true,
  useFindAndModify: false
});

// Routes
app.use(require("./routes/routes"));

app.listen(port, () => {
  console.log(`App is running on ${MONGODB_URI}:${port}`);
});

const express = require("express");
const mongoose = require("mongoose");

const port = process.env.port || 27017;
const app = express();
// Middleware
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  userNewUrlParser: true,
  useFindAndModify: false
});

// Routes
app.use(require("./routes/routes"));

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});

const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var MONGOD_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";
mongoose.connect(MONGOD_URI);

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
//    userNewUrlParser: true,
//    useFindAndModify: false,
// })

// Routes
app.use(require("./routes/routes"));

app.listen(PORT, () => {
   console.log(`http://localhost:${PORT}`);
});
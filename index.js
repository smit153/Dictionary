const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const WordSchema = new mongoose.Schema({
  word: Object,
});
const Word = mongoose.model("word", WordSchema);

app.use(cors());

app.use(bodyParser.json());

app.use("/add", (req, res, next) => {
  const word = new Word({
    word: req.body,
  });
  word.save().then(
    () => console.log("One entry added"),
    (err) => console.log(err)
  );
  res.json({ message: "Word added" });
});

app.use("/get", async (req, res, next) => {
  const all = await Word.find({});
  all.forEach((d, index) => {
    all[index] = all[index].word;
  });

  res.json({ message: all });
});

app.use("/", express.static(path.join(__dirname + "/public")));
const PORT = process.env.PORT || 8000;
mongoose
  .connect(
    "mongodb+srv://ErrorMakerzz:ErrorMakerzz@cluster0.ajyxrvg.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });

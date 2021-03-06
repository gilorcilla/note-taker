// npm packages require to establish server connectivity
const express = require("express");
const fs = require("fs");
const path = require("path");

// express set-up
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));

var notes = [];

var id;

// read/write notes elements
const readNotes = () => {
  fs.readFile(__dirname + "/db/db.json", (err, response) => {
    notes = JSON.parse(response);
  });
};

const writeNotes = () => {
  fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), (err) => {
    if (err) throw err;
  });
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// api routing elements

app.get("/api/notes", (req, res) => {
  readNotes();
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  newNote = req.body;
  id = Math.floor(Math.random() * 200) + notes.length;
  newNote.id = id++;
  notes.push(newNote);

  writeNotes();
  console.log("Note written to db.json");

  res.json(notes);
});
// delete element
app.delete("/api/notes/:id", (req, res) => {
  let chosenId = parseInt(req.params.id);
  let foundNote = notes.find((note) => note.id === chosenId);

  notes.splice(notes.indexOf(foundNote), 1);

  writeNotes();
  console.log("Note deleted form db.json");

  readNotes();

  res.json(foundNote);
});

app.listen(PORT, function () {
  console.log("Apps is listenting on PORT: " + PORT);
});

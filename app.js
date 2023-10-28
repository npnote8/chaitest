const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());

const people = [];

app.post("/api/v1/people", (req, res) => {
  if (!req.body.name || !req.body.age || req.body.age < 0) {
    return res
      .status(400)
      .json({ error: "Please enter a valid name and age." });
  }
  req.body.index = people.length;
  people.push(req.body);
  res
    .status(201)
    .json({ message: "A person entry was added.", index: req.body.index });
});

app.get("/api/v1/people", (req, res) => {
  res.json(people);
});

app.get("/api/v1/people/:id", (req, res) => {
  if (people.filter((p) => p.index === Number(req.params.id)).length > 0) {
    return res.json(people[Number(req.params.id)]);
  }
  res.status(404).json({ message: "The person record was not found." });
});

app.all("/api/v1/*", (req, res) => {
  res.json({ error: "That route is not implemented." });
});

const server = app.listen(3000, () => {
  console.log("listening on port 3000...");
});

module.exports = { app, server };

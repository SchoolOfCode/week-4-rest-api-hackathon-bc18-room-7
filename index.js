import express from "express";
const app = express();
const PORT = 3000;

import { getPlayerByShirtNumber, getPlayers, createPlayer } from "./players.js";

app.use(express.json());

//GET request for all players to show
app.get("/england", async function (req, res) {
  const players = await getPlayers();
  res.json(players);
});

//GET request for specific player to show by using their shirt number
app.get("/england/:shirtNumber", async function (req, res) {
  const shirtNumber = req.params.shirtNumber;
  const players = await getPlayerByShirtNumber(shirtNumber);
  res.json(players);
});

app.post("/england", async function(req, res) {
  const { shirtNumber } = req.body //grab shirt number from the body
  console.log(shirtNumber);
  let currentPlayer = await getPlayerByShirtNumber(shirtNumber); // look up if player already exists
  console.log(currentPlayer)
  if (currentPlayer !== null && currentPlayer !== undefined) { // if player already exists return 400 error
    return res.status(400).send('Player already exists with this squad number');
  }
  const newPlayer = await createPlayer(req.body); // else accept new number and entry
  res.status(201).json(newPlayer);
});



app.listen(PORT, function () {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});

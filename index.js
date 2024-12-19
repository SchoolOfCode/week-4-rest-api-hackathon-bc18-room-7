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

app.post("/england", async (req, res) => {
  const newPlayer = await createPlayer(req.body);
  res.json(newPlayer);
});

app.listen(PORT, function () {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});

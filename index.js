import express from "express";
const app = express();
const PORT = 3000;

import { getPlayers } from "./players.js";

app.use(express.json());

app.get("/england", async function (req, res) {
  const players = await getPlayers();
  res.json(players);
});

app.listen(PORT, function () {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});

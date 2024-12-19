import express from "express";
const app = express();
const PORT = 3000;

import {
  getPlayerByShirtNumber,
  getPlayers,
  createPlayer,
  deletePlayerByShirtNumber,
} from "./players.js";

app.use(express.json());

//GET request for all players to show
app.get("/england", async (req, res) => {
  try {
    const players = await getPlayers();
    res.status(200).json({ Success: true, payload: players }); //Successful GET
  } catch (error) {
    res.status(500).json({ success: false, message: error.message }); //Failed GET
  }
});

//GET request for specific player to show by using their shirt number
app.get("/england/:shirtNumber", async (req, res) => {
  try {
    const shirtNumber = req.params.shirtNumber;
    const players = await getPlayerByShirtNumber(shirtNumber);
    if (!players) {
      //if player with the given shirtNumber is not found
      return res.status(404).json({ Success: false });
    }
    res.status(200).json({ Success: true, payload: players }); //Successful GET by shirtNumber
  } catch (error) {
    res.status(500).json({ Success: false, message: error.message }); //Failed GET by shirtNumber
  }
});

app.post("/england", async (req, res) => {
  try {
    const { shirtNumber } = req.body; //grab shirt number from the body
    console.log(shirtNumber);
    let currentPlayer = await getPlayerByShirtNumber(shirtNumber); // look up if player already exists
    console.log(currentPlayer);
    if (currentPlayer !== null && currentPlayer !== undefined) {
      // if player already exists return 400 error
      return res
        .status(400)
        .send("Player already exists with this squad number");
    }
    const newPlayer = await createPlayer(req.body); // else accept new number and entry
    res.status(201).json({ Success: true, payload: newPlayer });
  } catch (error) {
    res.status(500).json({ Success: false, message: error.message });
  }
});

app.delete("/england/:shirtNumber", async (req, res) => {
  try {
    const shirtNumber = req.params.shirtNumber;
    const deletedPlayer = await deletePlayerByShirtNumber(shirtNumber);
    if (!deletedPlayer) {
      return res
        .status(404)
        .json({ success: false, message: `Player not found` });
    }
    res.status(200).json({ success: true, payload: deletedPlayer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, function () {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});

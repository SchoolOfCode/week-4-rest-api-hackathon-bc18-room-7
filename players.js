import { readPlayers, writePlayers } from "./helper.js";

export async function getPlayers() {
  const players = await readPlayers();
  return players;
}

export async function getPlayerByShirtNumber(shirtNumber) {
  const players = await readPlayers();

  const found = players.find((england) => england.shirtNumber === shirtNumber);

  return found;
}

export async function createPlayer(newPlayer) {
  const players = await readPlayers();
  players.push(newPlayer);

  await writePlayers(players);

  return newPlayer;
}

async function findPlayerIndexByShirtNumber(shirtNumber) {
  const players = await readPlayers();
  return players.findIndex(({ shirtNumber: sn }) => sn === shirtNumber); //extract the shirtNumber property from the player object and assign it to a new variable called sn
}

export async function deletePlayerByShirtNumber(shirtNumber) {
  const players = await readPlayers(); // Ensure you're getting the latest list of players
  const index = await findPlayerIndexByShirtNumber(shirtNumber);

  if (index === -1) {
    return;
  }

  const deleted = players[index];
  players.splice(index, 1);
  await writePlayers(players);
  return deleted;
}

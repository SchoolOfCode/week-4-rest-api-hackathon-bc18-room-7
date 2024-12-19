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

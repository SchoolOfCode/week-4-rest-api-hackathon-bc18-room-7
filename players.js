import { readPlayers, writePlayers } from "./helper.js";

export async function getPlayers() {
  const players = await readPlayers();
  return players;
}

import { createPlayer, deletePlayer, editPlayer, listPlayers } from "../../controllers/api/player_controller.js";
import { Router } from "express";

const player_router = Router();
player_router.get('/', listPlayers);
player_router.post('/', createPlayer);
player_router.put('/', editPlayer);
player_router.delete('/', deletePlayer);

export default player_router;
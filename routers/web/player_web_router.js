import { createPlayer, deletePlayer, editPlayer, listPlayers, savePlayer } from "../../controllers/web/player_web_controller.js";
import { Router } from "express";

const player_web_router = Router();

player_web_router.get('/', listPlayers);
player_web_router.post('/create', createPlayer);
player_web_router.post('/edit', editPlayer);
player_web_router.post('/save', savePlayer);
player_web_router.post('/delete', deletePlayer);

export default player_web_router;

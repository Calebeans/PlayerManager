import {createTournament, deleteTournament, editTournament, listTournaments, saveTournament} from "../../controllers/web/tournament_web_controller.js";
import { Router } from "express";

const tournament_web_router = Router();

tournament_web_router.get('/', listTournaments);
tournament_web_router.post('/createTournament', createTournament);
tournament_web_router.post('/editTournament', editTournament);
tournament_web_router.post('/saveTournament', saveTournament);
tournament_web_router.post('/deleteTournament', deleteTournament);

export default tournament_web_router;

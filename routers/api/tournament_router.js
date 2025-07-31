import { createTournament, deleteTournament, editTournament, listTournaments} from "../../controllers/api/tournament_controller.js";
import { Router } from "express";

const tournament_router = Router();
tournament_router.get('/', listTournaments);
tournament_router.post('/', createTournament);
tournament_router.put('/', editTournament);
tournament_router.delete('/', deleteTournament);

export default tournament_router;

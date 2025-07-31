import {createTeam, deleteTeam, editTeam, listTeams} from "../../controllers/api/team_controller.js";
import { Router } from "express";

const team_router = Router();
team_router.get('/', listTeams);
team_router.post('/', createTeam);
team_router.put('/', editTeam);
team_router.delete('/', deleteTeam);

export default team_router;
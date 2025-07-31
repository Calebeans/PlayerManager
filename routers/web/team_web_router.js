import {createTeam, deleteTeam, editTeam, listTeams, saveTeam} from "../../controllers/web/team_web_controller.js";
import { Router } from "express";

const team_web_router = Router();

team_web_router.get('/', listTeams);
team_web_router.post('/createTeam', createTeam);
team_web_router.post('/editTeam', editTeam);
team_web_router.post('/saveTeam', saveTeam);
team_web_router.post('/deleteTeam', deleteTeam);

export default team_web_router;

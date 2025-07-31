import {createMatch, deleteMatch, editMatch, listMatches} from "../../controllers/api/match_controller.js";
import { Router } from "express";

const match_router = Router();
match_router.get('/', listMatches);
match_router.post('/', createMatch);
match_router.put('/', editMatch);
match_router.delete('/', deleteMatch);

export default match_router;

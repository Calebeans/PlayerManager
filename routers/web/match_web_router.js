import { Router } from "express";
import {createMatch, listMatches, editMatch, saveMatch, deleteMatch} from "../../controllers/web/match_web_controller.js";

const matche_web_router = Router();

matche_web_router.get("/", listMatches);
matche_web_router.post("/createMatch", createMatch);
matche_web_router.post("/editMatch", editMatch);
matche_web_router.post("/saveMatch", saveMatch);
matche_web_router.post("/deleteMatch", deleteMatch);

export default matche_web_router;

import { Router } from "express";
import { createSong, getAllSongs, getSongById } from "./controller";

const songRouter: Router = Router();

songRouter.post("/", createSong);
songRouter.get("/", getAllSongs);
songRouter.get("/:id", getSongById);

export default songRouter;
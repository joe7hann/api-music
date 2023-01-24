import { Router } from "express";
import { createPlaylist, addSongToPlaylist, getPlaylistById } from "./controller";

const playlistRouter: Router = Router();

playlistRouter.post("/", createPlaylist);
playlistRouter.post("/add-song-to-playlist", addSongToPlaylist);
playlistRouter.get("/:id", getPlaylistById);

export default playlistRouter;
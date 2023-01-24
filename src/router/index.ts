import { songRouter, userRouter, playlistRouter } from "../components";

const listRoutes: Array<[string, any]> = [
    ["songs", songRouter],
    ["users", userRouter],
    ["playlists", playlistRouter]
];

export const routes = (app: any) => {
    listRoutes.forEach(([path, controller]) => {
        app.use(`/api/v1/${path}`, controller);
    });
};
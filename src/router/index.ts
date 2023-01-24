import { songRouter, userRouter, playlistRouter } from "../components";

const listRoutes: Array<[string, any]> = [["/api/v1/songs", songRouter],
["/api/v1/users", userRouter],
["/api/v1/playlists", playlistRouter]];

export const routes = (app: any) => {
    listRoutes.forEach(([path, controller]) => {
        app.use(path, controller);
    });
};
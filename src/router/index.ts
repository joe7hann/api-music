import { songRouter, userRouter } from "../components";

const listRoutes: Array<[string, any]> = [["/api/v1/songs", songRouter],
["/api/v1/users", userRouter]];

export const routes = (app: any) => {
    listRoutes.forEach(([path, controller]) => {
        app.use(path, controller);
    });
};
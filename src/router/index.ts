import { songRouter } from "../components";

const listRoutes: Array<[string, any]> = [["/api/v1/songs", songRouter]];

export const routes = (app: any) => {
    listRoutes.forEach(([path, controller]) => {
        app.use(path, controller);
    });
};
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
app_1.default.get("/", (req, res) => {
    res.send("API music");
});
const PORT = 3000;
app_1.default.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));

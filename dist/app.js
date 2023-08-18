"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const movieRoutes_1 = __importDefault(require("./routes/movieRoutes"));
const db_connection_1 = __importDefault(require("./db-connection"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use('/api', movieRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Hello world!');
});
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.listen(PORT, () => {
    console.log(`Application listening on port ${PORT}`);
});
(0, db_connection_1.default)();

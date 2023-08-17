"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const movieRoutes_1 = __importDefault(require("./routes/movieRoutes"));
const db_connection_1 = __importDefault(require("./db-connection"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
class App {
    constructor() {
        this.express = (0, express_1.default)();
        this.bootstrap();
    }
    getExpress() {
        return this.express;
    }
    bootstrap() {
        this.middleware();
    }
    middleware() {
        app.get('/', (req, res) => {
            res.send('jpagina de inicio');
        });
        app.use((0, cors_1.default)());
        app.use(body_parser_1.default.json());
        (0, db_connection_1.default)();
        app.use('/api', movieRoutes_1.default);
    }
}
exports.App = App;

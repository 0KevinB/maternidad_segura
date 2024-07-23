"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const medicoRoutes_1 = __importDefault(require("../routes/medicoRoutes"));
const comunityRoutes_1 = __importDefault(require("../routes/comunityRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Aplicacion corriendo en el puerto: " + this.port);
        });
    }
    routes() {
        this.app.use('/usuarios', userRoutes_1.default);
        this.app.use('/medicos', medicoRoutes_1.default);
        this.app.use('/comunidad', comunityRoutes_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({
            origin: 'http://localhost:4200',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
        }));
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Connect to database");
            }
            catch (error) {
                console.log("Unable to connect: ", error);
            }
        });
    }
}
exports.Server = Server;

import express from "express";
import cors from "cors";
import userRoutes from "../routes/userRoutes";
import medicoRoutes from "../routes/medicoRoutes";
import comunityRoutes from "../routes/comunityRoutes";
import { exec } from "child_process";

export class Server {
    private app: express.Application;
    private port: string;

    constructor() {
        this.app = express();
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
        this.app.use('/usuarios', userRoutes);
        this.app.use('/medicos', medicoRoutes);
        this.app.use('/comunidad', comunityRoutes);
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors({
            origin: 'http://localhost:4200',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
        }));
    }

    async dbConnect() {
        try {
            console.log("Connect to database");
        } catch (error) {
            console.log("Unable to connect: ", error);
        }
    }
}

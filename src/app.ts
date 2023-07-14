import 'dotenv/config';
import 'reflect-metadata';
import express = require("express");
import routers from './routes/routes';
import { AppDataSource } from './database/db';

const app = express();
const port = process.env.PORT_SERVER;

app.use(express.json());
app.use(routers);

AppDataSource.initialize()
    .then(async () => {
        console.clear();
        console.log("Banco de dados inicializado com sucesso!");
        app.listen(port,() => {
            console.log(`Servidor inicializado com sucesso na porta ${port}`)

        });
    })
    .catch((err) => {
        console.error("Erro durante a inicialização do banco de dados", err)
    })
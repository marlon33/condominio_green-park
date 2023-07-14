import "dotenv/config"
import "reflect-metadata"
import { DataSource } from "typeorm"
import Lotes from "../app/entities/Lotes"
import Boletos from "../app/entities/Boletos"
import BoletosLotes from "../app/entities/BoletosLotes"

export const AppDataSource = new DataSource({
    type: process.env.DB_DIALECT as any,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as any,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    synchronize: true,
    entities: [
        Lotes,
        Boletos,
        BoletosLotes
    ],
    migrations: ["src/migrations/*{.ts,.js}"]
})

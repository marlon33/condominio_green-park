import { Router } from 'express';
import boletosRouter from '../app/controllers/BoletosController';

const routers = Router();

routers.use('/boletos', boletosRouter);

export default routers;
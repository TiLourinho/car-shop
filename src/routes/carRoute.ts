import { Router } from 'express';
import carFactory from '../utils/factories';

const carRoute = Router();

carRoute.post('/', (req, res) => carFactory().create(req, res));
carRoute.get('/', (req, res) => carFactory().read(req, res));

export default carRoute;
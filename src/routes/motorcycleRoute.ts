import { Router } from 'express';
import { motorcycleFactory } from '../utils/factories';

const motorcycleRoute = Router();

motorcycleRoute.post('/', (req, res) => motorcycleFactory().create(req, res));

export default motorcycleRoute;
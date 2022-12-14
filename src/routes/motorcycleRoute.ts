import { Router } from 'express';
import { motorcycleFactory } from '../utils/factories';

const motorcycleRoute = Router();

motorcycleRoute.post('/', (req, res) => motorcycleFactory().create(req, res));
motorcycleRoute.get('/', (req, res) => motorcycleFactory().read(req, res));
motorcycleRoute.get('/:id', (req, res) =>
  motorcycleFactory().readOne(req, res));
motorcycleRoute.put('/:id', (req, res) => motorcycleFactory().update(req, res));
motorcycleRoute.delete('/:id', (req, res) =>
  motorcycleFactory().delete(req, res));

export default motorcycleRoute;
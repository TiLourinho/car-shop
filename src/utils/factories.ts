import CarModel from '../models/CarModel';
import CarService from '../services/CarService';
import CarController from '../controllers/CarController';
import MotorcycleModel from '../models/MotorcycleModel';
import MotorcycleService from '../services/MotorcycleService';
import MotorcycleController from '../controllers/MotorcycleController';

const carFactory = () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  return carController;
};

const motorcycleFactory = () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);
  const motorcycleController = new MotorcycleController(motorcycleService);

  return motorcycleController;
};

export {
  carFactory,
  motorcycleFactory,
};
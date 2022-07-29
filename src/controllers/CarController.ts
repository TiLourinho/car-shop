import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

class CarController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: Request, res: Response<ICar>) {
    const carRequest = req.body;
    const car = await this._service.create(carRequest);

    return res.status(201).json(car);
  }
}

export default CarController;

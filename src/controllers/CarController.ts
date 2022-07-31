import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';
import STATUS_CODE from '../utils/statusCodes';

class CarController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: Request, res: Response<ICar>) {
    const carRequest = req.body;
    const newCar = await this._service.create(carRequest);

    return res.status(STATUS_CODE.CREATED).json(newCar);
  }

  public async read(_req: Request, res: Response<ICar[]>) {
    const allCars = await this._service.read();

    return res.status(STATUS_CODE.OK).json(allCars);
  }

  public async readOne(req: Request, res: Response<ICar | null>) {
    const { id } = req.params;
    const foundCar = await this._service.readOne(id);

    return res.status(STATUS_CODE.OK).json(foundCar);
  }

  public async update(req: Request, res: Response<ICar | null>) {
    const { id } = req.params;
    const carUpdate = req.body;
    const updatedCar = await this._service.update(id, carUpdate);

    return res.status(STATUS_CODE.OK).json(updatedCar);
  }

  public async delete(req: Request, res: Response<ICar | null>) {
    const { id } = req.params;
    await this._service.delete(id);

    return res.status(STATUS_CODE.NO_CONTENT).end();
  }
}

export default CarController;

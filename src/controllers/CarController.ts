import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';
import STATUS_CODE from '../utils/statusCodes';

class CarController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: Request, res: Response<ICar>) {
    const carRequest = req.body;
    const car = await this._service.create(carRequest);

    return res.status(STATUS_CODE.CREATED).json(car);
  }

  public async read(_req: Request, res: Response<ICar[]>) {
    const car = await this._service.read();

    return res.status(STATUS_CODE.OK).json(car);
  }

  public async readOne(req: Request, res: Response<ICar>) {
    const { id } = req.params;
    const car = await this._service.readOne(id);

    return res.status(STATUS_CODE.OK).json(car);
  }
}

export default CarController;

import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import STATUS_CODE from '../utils/statusCodes';

class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) { }

  public async create(req: Request, res: Response<IMotorcycle>) {
    const motorcycleRequest = req.body;
    const newMotorcycle = await this._service.create(motorcycleRequest);

    return res.status(STATUS_CODE.CREATED).json(newMotorcycle);
  }

  public async read(_req: Request, res: Response<IMotorcycle[]>) {
    const allMotorcycles = await this._service.read();

    return res.status(STATUS_CODE.OK).json(allMotorcycles);
  }
}

export default MotorcycleController;
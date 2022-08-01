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

  public async readOne(req: Request, res: Response<IMotorcycle | null>) {
    const { id } = req.params;
    const foundMotorcycle = await this._service.readOne(id);

    return res.status(STATUS_CODE.OK).json(foundMotorcycle);
  }

  public async update(req: Request, res: Response<IMotorcycle | null>) {
    const { id } = req.params;
    const motorcycleUpdate = req.body;
    const updatedMotorcycle = await this._service.update(id, motorcycleUpdate);

    return res.status(STATUS_CODE.OK).json(updatedMotorcycle);
  }
}

export default MotorcycleController;
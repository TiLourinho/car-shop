import { isValidObjectId } from 'mongoose';
import { IService } from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { motorcycleSchema } from '../schemas';
import { ErrorTypes } from '../errors/catalog';

class MotorcycleService implements IService<IMotorcycle> {
  private _motorcycle: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  public async create(obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = motorcycleSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const newMotorcycle = await this._motorcycle.create(obj);

    return newMotorcycle;
  }

  public async read(): Promise<IMotorcycle[]> {
    const allMotorcycles = await this._motorcycle.read();

    return allMotorcycles;
  }

  public async readOne(id: string): Promise<IMotorcycle | null> {
    if (!isValidObjectId(id)) throw new Error(ErrorTypes.InvalidMongoId);

    const foundMotorcycle = await this._motorcycle.readOne(id);
    if (!foundMotorcycle) throw new Error(ErrorTypes.ObjectNotFound);

    return foundMotorcycle;
  }

  public async update(id: string, obj: IMotorcycle)
    : Promise<IMotorcycle | null> {
    if (!isValidObjectId(id)) throw new Error(ErrorTypes.InvalidMongoId);

    const parsed = motorcycleSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const checkedMotorcycle = await this._motorcycle.readOne(id);
    if (!checkedMotorcycle) throw new Error(ErrorTypes.ObjectNotFound);

    const updatedMotorcycle = await this._motorcycle.update(id, obj);

    return updatedMotorcycle;
  }

  delete(id: string) {
    return this._motorcycle.delete(id);
  }
}

export default MotorcycleService;
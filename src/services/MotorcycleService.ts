// import { isValidObjectId } from 'mongoose';
import { IService } from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { motorcycleSchema } from '../schemas';
// import { ErrorTypes } from '../errors/catalog';

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

  read() {
    return this._motorcycle.read();
  }

  readOne(id: string) {
    return this._motorcycle.readOne(id);
  }

  update(id: string, obj: IMotorcycle) {
    return this._motorcycle.update(id, obj);
  }

  delete(id: string) {
    return this._motorcycle.delete(id);
  }
}

export default MotorcycleService;
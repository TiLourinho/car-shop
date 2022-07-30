import { isValidObjectId } from 'mongoose';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { carSchema } from '../schemas';
import { ErrorTypes } from '../errors/catalog';

class CarService implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = carSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.create(obj);
  }

  public async read(): Promise<ICar[]> {
    return this._car.read();
  }

  public async readOne(_id: string): Promise<ICar | null> {
    if (!isValidObjectId(_id)) {
      throw new Error(ErrorTypes.InvalidMongoId);
    }

    const car = await this._car.readOne(_id);

    if (!car) {
      throw new Error(ErrorTypes.ObjectNotFound);
    }
    return car;
  }

  public async update(_id: string, obj: ICar): Promise<ICar | null> {
    if (!isValidObjectId(_id)) {
      throw new Error(ErrorTypes.InvalidMongoId);
    }

    const parsed = carSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    const checkCar = await this._car.readOne(_id);

    if (!checkCar) {
      throw new Error(ErrorTypes.ObjectNotFound);
    }

    const car = await this._car.update(_id, obj);
  
    return car;
  }
}

export default CarService;
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
    if (!parsed.success) throw parsed.error;

    const newCar = await this._car.create(obj);

    return newCar;
  }

  public async read(): Promise<ICar[]> {
    const allCars = await this._car.read();

    return allCars;
  }

  public async readOne(id: string): Promise<ICar | null> {
    if (!isValidObjectId(id)) throw new Error(ErrorTypes.InvalidMongoId);

    const foundCar = await this._car.readOne(id);
    if (!foundCar) throw new Error(ErrorTypes.ObjectNotFound);

    return foundCar;
  }

  public async update(id: string, obj: ICar): Promise<ICar | null> {
    if (!isValidObjectId(id)) throw new Error(ErrorTypes.InvalidMongoId);

    const parsed = carSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const checkedCar = await this._car.readOne(id);
    if (!checkedCar) throw new Error(ErrorTypes.ObjectNotFound);

    const updatedCar = await this._car.update(id, obj);
  
    return updatedCar;
  }

  public async delete(id: string): Promise<ICar | null> {
    if (!isValidObjectId(id)) throw new Error(ErrorTypes.InvalidMongoId);

    const checkedCar = await this._car.readOne(id);
    if (!checkedCar) throw new Error(ErrorTypes.ObjectNotFound);

    const removedCar = await this._car.delete(id);

    return removedCar;
  }
}

export default CarService;
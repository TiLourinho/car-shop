import * as sinon from 'sinon';
import chai from 'chai';
import { ZodError } from 'zod';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { carMock, carMockWithId, allCarsMock, carMockToUpdate, carMockToUpdateWithId } from '../../mocks/carMocks';
import { ErrorTypes } from '../../../errors/catalog';

const { expect } = chai;

describe('2 - CarService', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  describe('Create method', () => {
    beforeEach(async () => {
      sinon.stub(carModel, 'create').resolves(carMockWithId);
    });
  
    afterEach(()=>{
      sinon.restore();
    })
  
    it('tests if "create" returns an object', async () => {
      const newCar = await carService.create(carMock);
      expect(newCar).to.be.an('object');
    });

    it('tests if "create" returns an object exactly equal to "carMockWithId"', async () => {
      const newCar = await carService.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });

    it('tests if "create" accepts an invalid parameter', async () => {
      try {
        await carService.create({} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
  });

  describe('Read method', () => {
    before(() => {
      sinon.stub(carModel, 'read')
        .onCall(0).resolves(allCarsMock)
        .onCall(1).resolves([])
        .onCall(2).resolves(allCarsMock);
    });
  
    after(()=>{
      sinon.restore();
    })
  
    it('tests if "read" returns an array', async () => {
      const allCars = await carService.read();
      expect(allCars).to.be.an('array');
    });

    it('tests if "read" returns an empty array when database has no registered cars', async () => {
      const allCars = await carService.read();
      expect(allCars).to.be.deep.equal([]);
    });

    it('tests if "read" returns an object exactly equal to "allCarsMock"', async () => {
      const allCars = await carService.read();
      expect(allCars).to.be.deep.equal(allCarsMock);
    });
  });

  describe('ReadOne method', () => {
    before(() => {
      sinon.stub(carModel, 'readOne')
        .onCall(0).resolves(carMockWithId)
        .onCall(1).resolves()
        .onCall(2).resolves(carMockWithId)
        .onCall(3).resolves(carMockWithId);
    });

    after(() => {
      sinon.restore();
    });

    it('tests if "readOne" returns an object', async () => {
      const id = '62e468e4143e7395140ee57d';
      const car = await carService.readOne(id);
      expect(car).to.be.an('object');
    });

    it('tests if "readOne" returns an error when database has no registered cars', async () => {
      try {
        const id = '62e468e4143e7395140ee57d';
        await carService.readOne(id);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
      }
    });

    it('tests if "readOne" returns an error when id is invalid', async () => {
      try {
        const id = '123SALVEEU';
        await carService.readOne(id);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
      }
    });

    it('tests if "readOne" returns an object exactly equal to "carMockWithId"', async () => {
      const id = '62e468e4143e7395140ee57d';
      const car = await carService.readOne(id);
      expect(car).to.be.deep.equal(carMockWithId);
    });
  });

  describe('Update method', () => {
    before(() => {
      sinon.stub(carModel, 'readOne')
        .onCall(0).resolves(carMockWithId)
        .onCall(1).resolves()
        .onCall(2).resolves(carMockWithId);
      sinon.stub(carModel, 'update').resolves(carMockToUpdateWithId);
    });

    after(() => {
      sinon.restore();
    });

    it('tests if "update" returns an object', async () => {
      const id = '62e468e4143e7395140ee57d';
      const updatedCar = await carService.update(id, carMockToUpdate);
      expect(updatedCar).to.be.an('object');
    });

    it('tests if "update" returns an error when database has no registered cars', async () => {
      try {
        const id = '84e468e4143e7395140eaaaa';
        await carService.update(id, carMockToUpdate);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
      }
    });

    it('tests if "update" returns an error when id is invalid', async () => {
      try {
        const id = '123SALVEEU';
        await carService.update(id, carMockToUpdate);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
      }
    });

    it('tests if "update" accepts an invalid parameter', async () => {
      try {
        const id = '62e468e4143e7395140ee57d';
        await carService.update(id, {} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });

    it('tests if "update" returns an object exactly equal to "carMockToUpdateWithId"', async () => {
      const id = '62e6ab1cf7070abdb0aa0c2a';
      const updatedCar = await carService.update(id, carMockToUpdate);
      expect(updatedCar).to.be.deep.equal(carMockToUpdateWithId);
    });
  });

  describe('Delete method', () => {
    before(() => {
      sinon.stub(carModel, 'readOne')
        .onCall(0).resolves(carMockWithId)
        .onCall(1).resolves()
        .onCall(2).resolves(carMockWithId);
      sinon.stub(carModel, 'delete').resolves(carMockWithId);
    });

    after(() => {
      sinon.restore();
    });

    it('tests if "delete" returns an object', async () => {
      const id = '62e468e4143e7395140ee57d';
      const deletedCar = await carService.delete(id);
      expect(deletedCar).to.be.an('object');
    });

    it('tests if "delete" returns an error when database has no registered cars', async () => {
      try {
        const id = '84e468e4143e7395140ee57d';
        await carService.delete(id);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
      }
    });

    it('tests if "delete" returns an error when id is invalid', async () => {
      try {
        const id = '123SALVEEU';
        await carService.delete(id);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
      }
    });

    it('tests if "delete" returns an object exactly equal to "carMockWithId"', async () => {
      const id = '62e468e4143e7395140ee57d';
      const deletedCar = await carService.delete(id);
      expect(deletedCar).to.be.deep.equal(carMockWithId);
    });
  });
});
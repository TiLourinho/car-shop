import * as sinon from 'sinon';
import chai from 'chai';
import { ZodError } from 'zod';
import MotorcycleModel from '../../../models/MotorcycleModel';
import MotorcycleService from '../../../services/MotorcycleService';
import { motorcycleMock, motorcycleMockWithId, allMotorcyclesMock,
  motorcycleMockToUpdate, motorcycleMockToUpdateWithId } from '../../mocks/motorcycleMocks';
import { ErrorTypes } from '../../../errors/catalog';

const { expect } = chai;

describe('5 - MotorcycleService', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);

  describe('Create method', () => {
    beforeEach(async () => {
      sinon.stub(motorcycleModel, 'create').resolves(motorcycleMockWithId);
    });
  
    afterEach(()=>{
      sinon.restore();
    })
  
    it('tests if "create" returns an object', async () => {
      const newMotorcycle = await motorcycleService.create(motorcycleMock);
      expect(newMotorcycle).to.be.an('object');
    });

    it('tests if "create" returns an object exactly equal to "motorcycleMockWithId"', async () => {
      const newMotorcycle = await motorcycleService.create(motorcycleMock);
      expect(newMotorcycle).to.be.deep.equal(motorcycleMockWithId);
    });

    it('tests if "create" accepts an invalid parameter', async () => {
      try {
        await motorcycleService.create({} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
  });

  describe('Read method', () => {
    before(() => {
      sinon.stub(motorcycleModel, 'read')
        .onCall(0).resolves(allMotorcyclesMock)
        .onCall(1).resolves([])
        .onCall(2).resolves(allMotorcyclesMock);
    });
  
    after(()=>{
      sinon.restore();
    })
  
    it('tests if "read" returns an array', async () => {
      const allMotorcycles = await motorcycleService.read();
      expect(allMotorcycles).to.be.an('array');
    });

    it('tests if "read" returns an empty array when database has no registered motorcycles', async () => {
      const allMotorcycles = await motorcycleService.read();
      expect(allMotorcycles).to.be.deep.equal([]);
    });

    it('tests if "read" returns an object exactly equal to "allMotorcyclesMock"', async () => {
      const allMotorcycles = await motorcycleService.read();
      expect(allMotorcycles).to.be.deep.equal(allMotorcyclesMock);
    });
  });

  describe('ReadOne method', () => {
    before(() => {
      sinon.stub(motorcycleModel, 'readOne')
        .onCall(0).resolves(motorcycleMockWithId)
        .onCall(1).resolves()
        .onCall(2).resolves(motorcycleMockWithId)
        .onCall(3).resolves(motorcycleMockWithId);
    });

    after(() => {
      sinon.restore();
    });

    it('tests if "readOne" returns an object', async () => {
      const id = '62e72ec0da4b869355d9976c';
      const motorcycle = await motorcycleService.readOne(id);
      expect(motorcycle).to.be.an('object');
    });

    it('tests if "readOne" returns an error when database has no registered motorcycles', async () => {
      try {
        const id = '84e72ec0da4b869355d9aaaa';
        await motorcycleService.readOne(id);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
      }
    });

    it('tests if "readOne" returns an error when id is invalid', async () => {
      try {
        const id = '123SALVEEU';
        await motorcycleService.readOne(id);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
      }
    });

    it('tests if "readOne" returns an object exactly equal to "motorcycleMockWithId"', async () => {
      const id = '62e72ec0da4b869355d9976c';
      const motorcycle = await motorcycleService.readOne(id);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
  });

  describe('Update method', () => {
    before(() => {
      sinon.stub(motorcycleModel, 'readOne')
        .onCall(0).resolves(motorcycleMockWithId)
        .onCall(1).resolves()
        .onCall(2).resolves(motorcycleMockWithId);
      sinon.stub(motorcycleModel, 'update').resolves(motorcycleMockToUpdateWithId);
    });

    after(() => {
      sinon.restore();
    });

    it('tests if "update" returns an object', async () => {
      const id = '62e72ec0da4b869355d9976c';
      const updatedMotorcycle = await motorcycleService.update(id, motorcycleMockToUpdate);
      expect(updatedMotorcycle).to.be.an('object');
    });

    it('tests if "update" returns an error when database has no registered motorcycles', async () => {
      try {
        const id = '84e468e4143e7395140eaaaa';
        await motorcycleService.update(id, motorcycleMockToUpdate);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
      }
    });

    it('tests if "update" returns an error when id is invalid', async () => {
      try {
        const id = '123SALVEEU';
        await motorcycleService.update(id, motorcycleMockToUpdate);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
      }
    });

    it('tests if "update" accepts an invalid parameter', async () => {
      try {
        const id = '62e72ec0da4b869355d9976c';
        await motorcycleService.update(id, {} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });

    it('tests if "update" returns an object exactly equal to "motorcycleMockToUpdateWithId"', async () => {
      const id = '62e72ec0da4b869355d9976c';
      const updatedMotorcycle = await motorcycleService.update(id, motorcycleMockToUpdate);
      expect(updatedMotorcycle).to.be.deep.equal(motorcycleMockToUpdateWithId);
    });
  });
});
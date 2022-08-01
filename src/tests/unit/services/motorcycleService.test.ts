import * as sinon from 'sinon';
import chai from 'chai';
import { ZodError } from 'zod';
import MotorcycleModel from '../../../models/MotorcycleModel';
import MotorcycleService from '../../../services/MotorcycleService';
import { motorcycleMock, motorcycleMockWithId } from '../../mocks/motorcycleMocks';
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
      const newCar = await motorcycleService.create(motorcycleMock);
      expect(newCar).to.be.an('object');
    });

    it('tests if "create" returns an object exactly equal to "motorcycleMockWithId"', async () => {
      const newCar = await motorcycleService.create(motorcycleMock);
      expect(newCar).to.be.deep.equal(motorcycleMockWithId);
    });

    it('tests if "create" accepts an invalid parameter', async () => {
      try {
        await motorcycleService.create({} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
  });
});
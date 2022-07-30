import * as sinon from 'sinon';
import chai from 'chai';
import { ZodError } from 'zod';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { carMock, carMockWithId } from '../../mocks/carMocks';

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
});
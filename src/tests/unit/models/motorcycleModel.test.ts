import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import MotorcycleModel from '../../../models/MotorcycleModel';
import { motorcycleMock, motorcycleMockWithId } from '../../mocks/motorcycleMocks';

const { expect } = chai;

describe('4 - MotorcycleModel', () => {
  const motorcycleModel = new MotorcycleModel();

  describe('Create method', () => {
    beforeEach(() => {
      sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
    });
  
    afterEach(()=>{
      sinon.restore();
    });
  
    it('tests if "create" returns an object', async () => {
      const newMotorcycle = await motorcycleModel.create(motorcycleMock);
      expect(newMotorcycle).to.be.an('object');
    });

    it('tests if "create" returns an object exactly equal to "motorcycleMockWithId"', async () => {
      const newMotorcycle = await motorcycleModel.create(motorcycleMock);
      expect(newMotorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
  });
});
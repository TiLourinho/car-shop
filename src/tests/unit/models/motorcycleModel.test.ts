import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import MotorcycleModel from '../../../models/MotorcycleModel';
import { motorcycleMock, motorcycleMockWithId, allMotorcyclesMock } from '../../mocks/motorcycleMocks';

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

  describe('Read method', () => {
    before(() => {
      sinon.stub(Model, 'find')
        .onCall(0).resolves(allMotorcyclesMock)
        .onCall(1).resolves([])
        .onCall(2).resolves(allMotorcyclesMock);
    });

    after(()=>{
      sinon.restore();
    });

    it('tests if "read" returns an array', async () => {
      const allMotorcycles = await motorcycleModel.read();
      expect(allMotorcycles).to.be.an('array');
    });

    it('tests if "read" returns an empty array when database has no registered motorcycles', async () => {
      const allMotorcycles = await motorcycleModel.read();
      expect(allMotorcycles).to.be.deep.equal([]);
    });

    it('tests if "read" returns an array exactly equal to "allMotorcyclesMock"', async () => {
      const allMotorcycles = await motorcycleModel.read();
      expect(allMotorcycles).to.be.deep.equal(allMotorcyclesMock);
    });
  });
});
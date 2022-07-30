import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import CarModel from '../../../models/CarModel';
import { carMock, carMockWithId, allCarsMock } from '../../mocks/carMocks';

const { expect } = chai;

describe('1 - CarModel', () => {
  const carModel = new CarModel();

  describe('Create method', () => {
    beforeEach(() => {
      sinon.stub(Model, 'create').resolves(carMockWithId);
    });
  
    afterEach(()=>{
      sinon.restore();
    });
  
    it('tests if "create" returns an object', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.an('object');
    });

    it('tests if "create" returns an object exactly equal to "carMockWithId"', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });
  });

  describe('Read method', () => {
    before(() => {
      sinon.stub(Model, 'find')
        .onCall(0).resolves(allCarsMock)
        .onCall(1).resolves([])
        .onCall(2).resolves(allCarsMock);
    });
  
    after(()=>{
      sinon.restore();
    });
  
    it('tests if "read" returns an array', async () => {
      const allCars = await carModel.read();
      expect(allCars).to.be.an('array');
    });

    it('tests if "read" returns an empty array when database has no registered cars', async () => {
      const allCars = await carModel.read();
      expect(allCars).to.be.deep.equal([]);
    });

    it('tests if "read" returns an array exactly equal to "allCarsMock"', async () => {
      const allCars = await carModel.read();
      expect(allCars).to.be.deep.equal(allCarsMock);
    });
  });

  describe('ReadOne method', () => {
    beforeEach(() => {
      sinon.stub(Model, 'findOne').resolves(carMockWithId);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('tests if "readOne" returns an object', async () => {
      const id = '62e468e4143e7395140ee57d';
      const car = await carModel.readOne(id);
      expect(car).to.be.an('object');
    });

    it('tests if "readOne" returns an object exactly equal to "carMockWithId"', async () => {
      const id = '62e468e4143e7395140ee57d';
      const car = await carModel.readOne(id);
      expect(car).to.be.deep.equal(carMockWithId);
    });
  });
});
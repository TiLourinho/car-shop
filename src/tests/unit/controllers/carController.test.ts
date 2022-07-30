import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';
import { carMock, allCarsMock, carMockWithId } from '../../mocks/carMocks';

const { expect } = chai;

describe('3 - CarController', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  describe('Create method', () => {
    before(() => {
      sinon.stub(carService, 'create').resolves(carMock);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
  
    after(()=>{
      sinon.restore();
    })
  
    it('tests if "create" has status 201 and returns an object exactly equal to "carMock"', async () => {
      req.body = carMock;

      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('Read method', () => {
    before(() => {
      sinon.stub(carService, 'read').resolves(allCarsMock);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    after(() => {
      sinon.restore();
    });

    it('tests if "read" has status 200 and returns an object exactly equal to "allCarsMock"', async () => {
      await carController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(allCarsMock)).to.be.true;
    });
  });

  describe('Read method', () => {
    before(() => {
      sinon.stub(carService, 'readOne').resolves(carMockWithId);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    after(() => {
      sinon.restore();
    });

    it('tests if "readOne" has status 200 and returns an object exactly equal to "carMockWithId"', async () => {
      req.params = { id: '62e468e4143e7395140ee57d' };

      await carController.readOne(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });
});
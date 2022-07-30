import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';
import { carMock } from '../../mocks/carMocks';

const { expect } = chai;

describe('3 - CarController', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  describe('Create method', () => {
    const req = {} as Request;
    const res = {} as Response;

    beforeEach(async () => {
      sinon.stub(carService, 'create').resolves(carMock);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
  
    afterEach(()=>{
      sinon.restore();
    })
  
    it('tests if "create" works as expected', async () => {
      req.body = carMock;

      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });
});
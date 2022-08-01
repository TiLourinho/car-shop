import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import MotorcycleModel from '../../../models/MotorcycleModel';
import MotorcycleService from '../../../services/MotorcycleService';
import MotorcycleController from '../../../controllers/MotorcycleController';
import { motorcycleMock } from '../../mocks/motorcycleMocks';

const { expect } = chai;

describe('6 - MotorcycleController', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);
  const motorcycleController = new MotorcycleController(motorcycleService);

  const req = {} as Request;
  const res = {} as Response;

  describe('Create method', () => {
    before(() => {
      sinon.stub(motorcycleService, 'create').resolves(motorcycleMock);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
  
    after(()=>{
      sinon.restore();
    })
  
    it('tests if "create" has status 201 and returns an object exactly equal to "motorcycleMock"', async () => {
      req.body = motorcycleMock;

      await motorcycleController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMock)).to.be.true;
    });
  });
});
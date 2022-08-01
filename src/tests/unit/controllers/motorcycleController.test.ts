import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import MotorcycleModel from '../../../models/MotorcycleModel';
import MotorcycleService from '../../../services/MotorcycleService';
import MotorcycleController from '../../../controllers/MotorcycleController';
import { motorcycleMock, allMotorcyclesMock, motorcycleMockWithId,
  motorcycleMockToUpdate, motorcycleMockToUpdateWithId } from '../../mocks/motorcycleMocks';

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

  describe('Read method', () => {
    before(() => {
      sinon.stub(motorcycleService, 'read').resolves(allMotorcyclesMock);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    after(() => {
      sinon.restore();
    });

    it('tests if "read" has status 200 and returns an object exactly equal to "allMotorcyclesMock"', async () => {
      await motorcycleController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(allMotorcyclesMock)).to.be.true;
    });
  });

  describe('ReadOne method', () => {
    before(() => {
      sinon.stub(motorcycleService, 'readOne').resolves(motorcycleMockWithId);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    after(() => {
      sinon.restore();
    });

    it('tests if "readOne" has status 200 and returns an object exactly equal to "motorcycleMockWithId"', async () => {
      req.params = { id: '62e72ec0da4b869355d9976c' };

      await motorcycleController.readOne(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });
  });

  describe('Update method', () => {
    before(() => {
      sinon.stub(motorcycleService, 'update').resolves(motorcycleMockToUpdateWithId);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    after(() => {
      sinon.restore();
    });

    it('tests if "update" has status 200 and returns an object exactly equal to "motorcycleMockToUpdateWithId"', async () => {
      req.params = { id: '62e72ec0da4b869355d9976c' };
      req.body = motorcycleMockToUpdate;

      await motorcycleController.update(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockToUpdateWithId)).to.be.true;
    });
  });

  describe('Delete method', () => {
    before(() => {
      sinon.stub(motorcycleService, 'delete').resolves();
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    after(() => {
      sinon.restore();
    });

    it('tests if "delete" has status 204 and nothing returned', async () => {
      req.params = { id: '62e72ec0da4b869355d9976c' };

      await motorcycleController.delete(req, res);
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith()).to.be.true;
    });
  });
});
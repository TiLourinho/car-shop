import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';
import { carMock, allCarsMock, carMockWithId, carMockToUpdate, carMockToUpdateWithId } from '../../mocks/carMocks';

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

  describe('ReadOne method', () => {
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

  describe('Update method', () => {
    before(() => {
      sinon.stub(carService, 'update').resolves(carMockToUpdateWithId);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    after(() => {
      sinon.restore();
    });

    it('tests if "update" has status 200 and returns an object exactly equal to "carMockToUpdateWithId"', async () => {
      req.params = { id: '62e6ab1cf7070abdb0aa0c2a' };
      req.body = carMockToUpdate;

      await carController.update(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockToUpdateWithId)).to.be.true;
    });
  });

  describe('Delete method', () => {
    before(() => {
      sinon.stub(carService, 'delete').resolves();
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    after(() => {
      sinon.restore();
    });

    it('tests if "delete" has status 204 and nothing returned', async () => {
      req.params = { id: '62e6ab1cf7070abdb0aa0c2a' };

      await carController.delete(req, res);
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith()).to.be.true;
    });
  });
});
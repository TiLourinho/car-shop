import IMotorcycle from '../../interfaces/IMotorcycle';

const motorcycleMock: IMotorcycle = {
  model: "Honda CBR 1000RR",
  year: 2007,
  color: "black",
  buyValue: 37900,
  category: "Street",
  engineCapacity: 1000
};

const motorcycleMockWithId: IMotorcycle & { _id: string }= {
  _id: '62e721d8fb384e37fa8e7f2e',
  model: "Honda CBR 1000RR",
  year: 2007,
  color: "black",
  buyValue: 37900,
  category: "Street",
  engineCapacity: 1000
};

export {
  motorcycleMock,
  motorcycleMockWithId
};
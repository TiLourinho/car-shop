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

const motorcycleMockToUpdate: IMotorcycle = {
	model: "Honda CBR 1000RR",
  year: 2007,
  color: "black",
  buyValue: 36500,
  category: "Street",
  engineCapacity: 1000
}

const motorcycleMockToUpdateWithId: IMotorcycle & { _id: string } = {
  _id: '62e721d8fb384e37fa8e7f2e',
	model: "Honda CBR 1000RR",
  year: 2007,
  color: "black",
  buyValue: 36500,
  category: "Street",
  engineCapacity: 1000
}

const allMotorcyclesMock: IMotorcycle[] & { _id: string }[] = [
	{
		_id: '62e721d8fb384e37fa8e7f2e',
    model: "Honda CBR 1000RR",
    year: 2007,
    color: "black",
    buyValue: 37900,
    category: "Street",
    engineCapacity: 1000
	},
	{
		_id: '62e72ec0da4b869355d9976c',
    model: "Kawasaki Ninja ZX-9R",
    year: 1999,
    color: "green",
    buyValue: 25000,
    category: "Street",
    engineCapacity: 900
	}
];

export {
  motorcycleMock,
  motorcycleMockWithId,
  motorcycleMockToUpdate,
  motorcycleMockToUpdateWithId,
  allMotorcyclesMock
};
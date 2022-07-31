import ICar from '../../interfaces/ICar';

const carMock: ICar = {
  model: 'Volkswagen Gol GTI',
	year: 1993,
	color: 'grey',
	buyValue: 169990,
	seatsQty: 4,
	doorsQty: 2
};

const carMockWithId: ICar & { _id: string } = {
  _id: '62e468e4143e7395140ee57d',
  model: 'Volkswagen Gol GTI',
	year: 1993,
	color: 'grey',
	buyValue: 169990,
	seatsQty: 4,
	doorsQty: 2
};

const carMockToUpdate: ICar = {
	model: 'Volkswagen Gol GTI',
	year: 1993,
	color: 'red',
	buyValue: 149990,
	seatsQty: 4,
	doorsQty: 2
}

const carMockToUpdateWithId: ICar & { _id: string }= {
	_id: '62e6ab1cf7070abdb0aa0c2a',
	model: 'Volkswagen Gol GTI',
	year: 1993,
	color: 'red',
	buyValue: 149990,
	seatsQty: 4,
	doorsQty: 2
}

const allCarsMock: ICar[] & { _id: string }[] = [
	{
		_id: "62e54abd77c0b5a9f3f95863",
		model: "Volkswagen Gol GTI",
		year: 1993,
		color: "grey",
		buyValue: 169990,
		doorsQty: 2,
		seatsQty: 4
	},
	{
		_id: "62e54bf477c0b5a9f3f95865",
		model: "Chevrolet Tigra",
		year: 1998,
		color: "blue",
		buyValue: 26000,
		doorsQty: 2,
		seatsQty: 4
	}
];

export {
  carMock,
  carMockWithId,
	carMockToUpdate,
	carMockToUpdateWithId,
	allCarsMock
};

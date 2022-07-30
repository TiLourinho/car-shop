import ICar from '../../interfaces/ICar';

const carMock: ICar = {
  model: 'Volkswagen Gol GTI',
	year: 1993,
	color: 'grey',
	buyValue: 169990,
	seatsQty: 4,
	doorsQty: 2
}

const carMockWithId: ICar & { _id:string } = {
  _id: '62e468e4143e7395140ee57d',
  model: 'Volkswagen Gol GTI',
	year: 1993,
	color: 'grey',
	buyValue: 169990,
	seatsQty: 4,
	doorsQty: 2
}

export {
  carMock,
  carMockWithId
};

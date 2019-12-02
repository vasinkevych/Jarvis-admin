const CarsService = require('../../services/cars.service');
const OpenDBService = require('../../services/opendb.service');
const HelpersGraphQLService = require('../helpers');

module.exports = {
  cars(args) {
    return CarsService.getAllCars().then(cars =>
      HelpersGraphQLService.resolverAttachUsersToCars(cars)
    );
  },
  car(args) {
    return CarsService.getCarById(args.id).then(car =>
      HelpersGraphQLService.resolverAttachUsersToCar(car)
    );
  },

  carsLikeNumber(args) {
    return CarsService.getCarsLikeNumber(args.number).then(cars =>
      HelpersGraphQLService.resolverAttachUsersToCars(cars)
    );
  },

  carRegistrations(carNumber) {
    return OpenDBService.getCarRegistrations(carNumber);
  }
};

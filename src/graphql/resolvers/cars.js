const CarsService = require('../../services/cars.servise');
const HelpersGraphQLService = require('../helpers');

module.exports = {
  cars(args) {
    return CarsService
      .getAllCars()
      .then(cars => HelpersGraphQLService.resolverAttachUsersToCars(cars))
  },
  car(args) {
    return CarsService
      .getCarById(args.id)
      .then(car => HelpersGraphQLService.resolverAttachUsersToCar(car));
  }
};

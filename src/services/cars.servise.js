const DatabaseService = require('../services/database.service');

module.exports = {
  getAllCars() {
    return DatabaseService.runSql(`SELECT * FROM cars`);
  },

  getAllCarsByUser(userId) {
    return DatabaseService.runSql(`
      SELECT * 
      FROM users_cars 
      LEFT JOIN cars
      ON users_cars.car_id = cars.id
      WHERE users_cars.user_id = ${userId};`);
  },

  getCarById(carId) {
    return DatabaseService.runSql(`SELECT * FROM cars WHERE id = ${carId}`)
      .then(data => {
        if (data && data[0]) {
          return data[0];
        }
      });
  },

  getAllUsersInCar(carId) {
    return DatabaseService.runSql(`
      SELECT * 
      FROM users_cars 
      LEFT JOIN users
      ON users_cars.user_id = users.id
      WHERE users_cars.car_id = ${carId};`);
  }
};

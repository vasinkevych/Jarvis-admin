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
    return DatabaseService.runSql(
      `SELECT * FROM cars WHERE id = ${carId}`
    ).then(data => {
      if (data && data[0]) {
        return data[0];
      }
    });
  },

  getCarByNumber(carNumber) {
    console.log(`SELECT * FROM cars WHERE number = '${carNumber}';`);
    return DatabaseService.runSql(
      `SELECT * FROM cars WHERE number = '${carNumber}';`
    ).then(data => {
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
  },

  insertCar({brand, number}) {
    return DatabaseService.runSql(`INSERT INTO cars (brand, number) VALUES ('${brand}', '${number}');`)
      .then(data => this.getCarById(data.insertId));
  },

  addRelationBeetwenCarAndNumber({user_id, car_id}) {
    return DatabaseService.runSql(`SELECT * FROM users_cars WHERE user_id = ${user_id} AND car_id=${car_id};`)
      .then(data => {
        if (data.length) {
          return;
        }
        return DatabaseService.runSql(`INSERT INTO users_cars (user_id, car_id) VALUES ('${user_id}', '${car_id}');`);
      });
  },

  insertCarIfNotExist({user_id, brand, number}) {
    let resultCar;
    return this.getCarByNumber(number)
      .then((car) => {
        if (car) {
          return car;
        }
        return this.insertCar({brand, number})
      })
      .then(car => {
        resultCar = car;
        return this.addRelationBeetwenCarAndNumber({
          user_id,
          car_id: car.id
        });
      })
      .then(() => resultCar);
  },
};

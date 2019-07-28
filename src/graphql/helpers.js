const UsersService = require('../services/users.servise');
const CarsService = require('../services/cars.servise');

module.exports = {
  getAllCarsByUser(userId) {
    return CarsService.getAllCarsByUser(userId).then(cars =>
      this.resolverAttachUsersToCars(cars)
    );
  },

  getAllUsersInCar(carId) {
    return CarsService.getAllUsersInCar(carId).then(users =>
      this.resolverAttachCarsToUsers(users)
    );
  },

  resolverAttachCarsToUsers(users) {
    return users.map(user => this.resolverAttachCarsToUser(user));
  },

  resolverAttachCarsToUser(user) {
    return Object.assign({}, user, {
      cars: () => {
        if (user.cars) {
          return this.resolverAttachUsersToCars(user.cars);
        }
        return this.getAllCarsByUser(user.id);
      },
      mobile: () => {
        if (user.mobile) {
          return user.mobile;
        }
        return UsersService.getMobilePhonesByUser(user.id);
      },
      skype: () => {
        if (user.skype !== undefined) {
          return user.skype;
        }
        return UsersService.getSkypeByUser(user.id);
      }
    });
  },

  resolverAttachUsersToCars(cars) {
    return cars.map(car => {
      return Object.assign({}, car, {
        users: this.getAllUsersInCar.bind(this, car.id)
      });
    });
  },

  resolverAttachUsersToCar(car) {
    return Object.assign({}, car, {
      users: this.getAllUsersInCar.bind(this, car.id)
    });
  }
};

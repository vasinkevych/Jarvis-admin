const configs = require('../configs');
const carMatch = require('../utils/simple-car-match');

const DatabaseService = require('../services/database.service');
const CarService = require('../services/cars.service');
const ConstantService = require('../services/constant.service');

const getUserDetails = (id, carId) => {
  let sql = `
      SELECT 
        users.id AS users_id,
        users.name AS users_name,
        user_contacts.id AS user_contacts_id,
        user_contacts.type AS user_contacts_type,
        user_contacts.value AS user_contacts_value,
        cars.id AS cars_id ,
        cars.number AS cars_number,
        cars.brand AS cars_brand
      FROM users
      LEFT JOIN user_contacts
      ON users.id = user_contacts.user_id
      LEFT JOIN users_cars
      ON users.id = users_cars.user_id
      LEFT JOIN cars
      ON users_cars.car_id = cars.id
    `;
  if (id) {
    sql += ` WHERE users.id='${id}'`;
  }
  if (carId) {
    sql += ` WHERE users_cars.car_id='${carId}'`;
  }
  return DatabaseService.runSql(sql);
};

module.exports = {
  getUserDetails,
  // TODO replace it with normal solution
  getUserByNumber(scans) {
    return DatabaseService.runSql(`SELECT * FROM cars`)
      .then(cars => carMatch.find(scans, cars, carMatch.carSearchOptions))
      .then(
        userIds =>
          userIds &&
          userIds
            .slice(0, configs.SEARCH_RESULT_COUNT)
            .map(({ item }) => getUserDetails(null, item))
      )
      .then(promises => (promises ? Promise.all(promises) : null))
      .then(user =>
        user
          ? {
              ...user,
              name: user.users_name,
              tel: user.user_contacts_value,
              skype: ''
            }
          : {}
      );
  },

  findUsers(scans) {
    return getUserDetails()
      .then(users => {
        return carMatch.find(scans, users, carMatch.userSearchOptions);
      })
      .then(users =>
        users.slice(0, configs.SEARCH_RESULT_COUNT).map(({ item, score }) => ({
          name: item.users_name,
          tel: item.user_contacts_value,
          carNumber: item.cars_number,
          carBrand: item.cars_brand,
          skype: '',
          complianceScore: 1 - score
        }))
      )
      .catch(e => console.error(e));
  },

  getAllUsers() {
    return DatabaseService.runSql(`SELECT * FROM users`);
  },

  getUserById(id) {
    return DatabaseService.runSql(`SELECT * from users WHERE id='${id}';`).then(
      data => {
        if (data.length) {
          return data[0];
        }
        return null;
      }
    );
  },

  /* eslint-disable camelcase */
  getUserByName(name) {
    return DatabaseService.runSql(
      `SELECT * from users WHERE name='${name}';`
    ).then(data => {
      if (data.length) {
        return data[0];
      }
      return null;
    });
  },

  insertUser({ name }) {
    return DatabaseService.runSql(
      `INSERT INTO users (name) VALUES ('${name}');`
    ).then(data => this.getUserById(data.insertId));
  },

  insertUserIfNotExist({ name }) {
    return this.getUserByName(name).then(user => {
      if (user) {
        return user;
      }
      return this.insertUser({ name });
    });
  },

  getMobilePhoneByUserIdAndPhone({ user_id, mobilePhone }) {
    return DatabaseService.runSql(
      `SELECT * from user_contacts WHERE 
        user_id=${user_id} AND 
        value='${mobilePhone}' AND 
        type=${ConstantService.MOBILE_PHONE};
    `
    ).then(data => {
      if (data.length) {
        return data[0];
      }
      return null;
    });
  },

  addMobilePhone({ user_id, mobilePhone }) {
    this.getMobilePhoneByUserIdAndPhone({ user_id, mobilePhone }).then(
      mobile => {
        if (mobile) {
          return mobile;
        }
        return DatabaseService.runSql(`INSERT INTO user_contacts (user_id, type, value) 
          VALUES ('${user_id}', '${
          ConstantService.MOBILE_PHONE
        }', '${mobilePhone}');`);
      }
    );
  },

  getMobilePhonesByUser(user_id) {
    return DatabaseService.runSql(
      `SELECT * from user_contacts WHERE 
        user_id=${user_id} AND 
        type=${ConstantService.MOBILE_PHONE};
    `
    ).then(data => {
      if (data.length) {
        return data.map(el => el.value);
      }
      return null;
    });
  },

  getSkypeByUser(user_id) {
    return DatabaseService.runSql(
      `SELECT * from user_contacts WHERE 
        user_id=${user_id} AND 
        type=${ConstantService.SKYPE};
    `
    ).then(data => {
      if (data.length) {
        return data[0].value;
      }
      return null;
    });
  },

  getSkypeByUserIdAndSkypeValue({ user_id, skype }) {
    return DatabaseService.runSql(
      `SELECT * from user_contacts WHERE 
        user_id=${user_id} AND 
        value='${skype}' AND 
        type=${ConstantService.SKYPE};
    `
    ).then(data => {
      if (data.length) {
        return data[0];
      }
      return null;
    });
  },

  addSkype({ user_id, skype }) {
    this.getSkypeByUserIdAndSkypeValue({ user_id, skype }).then(skype => {
      if (skype) {
        return skype;
      }
      return DatabaseService.runSql(`INSERT INTO user_contacts (user_id, type, value) 
          VALUES ('${user_id}', '${ConstantService.SKYPE}', '${skype}');`);
    });
  },

  addUserAndDetails(data) {
    let user_id;
    return this.insertUserIfNotExist({ name: data.user })
      .then(user => {
        user_id = user.id;
        if (!data.carNumber || !data.carNumber.length) {
          return;
        }
        return Promise.all(
          data.carNumber.map(number =>
            CarService.insertCarIfNotExist({
              user_id,
              number: number,
              brand: data.brand // TODO brand also should be array;
            })
          )
        );
      })
      .then(() => {
        if (data.phones && data.phones.length) {
          return Promise.all(
            data.phones.map(mobilePhone =>
              this.addMobilePhone({ user_id, mobilePhone })
            )
          );
        }
      })
      .then(() => {
        if (data.skype) {
          return this.addSkype({ user_id, skype: data.skype });
        }
      });
  },

  addUsersRecursive(data, n) {
    if (!data[n]) {
      return;
    }
    return this.addUserAndDetails(data[n]).then(() =>
      this.addUsersRecursive(data, n + 1)
    );
  },

  bulkAddUsers(data) {
    return this.addUsersRecursive(data, 0);
  },

  parseUserData(data) {
    const usersMap = {};
    data.forEach(row => {
      if (!usersMap[row.users_id]) {
        usersMap[row.users_id] = {
          id: row.users_id,
          name: row.users_name
        };
      }
      if (!usersMap[row.users_id].mobile) {
        usersMap[row.users_id].mobile = {};
      }
      if (parseInt(row.user_contacts_type) === ConstantService.MOBILE_PHONE) {
        usersMap[row.users_id].mobile[row.user_contacts_id] =
          row.user_contacts_value;
      }
      if (parseInt(row.user_contacts_type) === ConstantService.SKYPE) {
        usersMap[row.users_id].skype = row.user_contacts_value;
      }
      if (!usersMap[row.users_id].cars) {
        usersMap[row.users_id].cars = {};
      }
      if (row.cars_id) {
        usersMap[row.users_id].cars[row.cars_id] = {
          id: row.cars_id,
          number: row.cars_number,
          brand: row.cars_brand
        };
      }
    });
    const result = Object.keys(usersMap).reduce((previousValue, key) => {
      const cars = Object.keys(usersMap[key].cars).reduce(
        (previousValue, carKey) => {
          previousValue.push(usersMap[key].cars[carKey]);
          return previousValue;
        },
        []
      );
      const mobile = Object.keys(usersMap[key].mobile).reduce(
        (previousValue, mobileKey) => {
          previousValue.push(usersMap[key].mobile[mobileKey]);
          return previousValue;
        },
        []
      );
      previousValue.push({
        ...usersMap[key],
        cars,
        mobile,
        skype: usersMap[key].skype || ''
      });
      return previousValue;
    }, []);
    return result;
  }
};

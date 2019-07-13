const DatabaseService = require('../services/database.service');
const CarService = require('../services/cars.servise');
const ConstantServie = require('../services/constant.servise');

module.exports = {
  // TODO ....
  getUserByNumber(number) {
    return Promise.resolve({
      name: 'test name',
      email: 'vivanch@softserveinc.com',
      skype: 'kori_qwe',
      phoneNumber: '0685435102'
    });
  },

  getAllUsers() {
    return DatabaseService.runSql(`SELECT * FROM users`);
  },

  getUserById(id) {
    return DatabaseService.runSql(`SELECT * from users WHERE id='${id}';`)
      .then((data) => {
        if (data.length) {
          return data[0];
        }
        return null;
      });
  },

  getUserByName(name) {
    return DatabaseService.runSql(`SELECT * from users WHERE name='${name}';`)
      .then((data) => {
        if (data.length) {
          return data[0];
        }
        return null;
      });
  },

  insertUser({name}) {
    return DatabaseService.runSql(`INSERT INTO users (name) VALUES ('${name}');`)
      .then(data => this.getUserById(data.insertId));
  },

  insertUserIfNotExist({name}) {
    return this.getUserByName(name)
      .then((user) => {
        if (user) {
          return user;
        }
        return this.insertUser({name})
      });
  },

  getMobilePhoneByUserIdAndPhone({user_id, mobilePhone}) {
    return DatabaseService.runSql(`SELECT * from user_contacts WHERE 
        user_id=${user_id} AND 
        value='${mobilePhone}' AND 
        type=${ConstantServie.MOBILE_PHONE};
    `)
      .then((data) => {
        if (data.length) {
          return data[0];
        }
        return null;
      });
  },

  addMobilePhone({user_id, mobilePhone}) {
    this.getMobilePhoneByUserIdAndPhone({user_id, mobilePhone})
      .then(mobile => {
        if (mobile) {
          return mobile;
        }
        return DatabaseService.runSql(`INSERT INTO user_contacts (user_id, type, value) 
          VALUES ('${user_id}', '${ConstantServie.MOBILE_PHONE}', '${mobilePhone}');`)
      });
  },

  getMobilePhonesByUser(user_id) {
      return DatabaseService.runSql(`SELECT * from user_contacts WHERE 
        user_id=${user_id} AND 
        type=${ConstantServie.MOBILE_PHONE};
    `)
        .then((data) => {
          if (data.length) {
            return data.map(el => el.value);
          }
          return null;
        });
  },

  getSkypeByUser(user_id) {
    return DatabaseService.runSql(`SELECT * from user_contacts WHERE 
        user_id=${user_id} AND 
        type=${ConstantServie.SKYPE};
    `)
      .then((data) => {
        if (data.length) {
          return data[0].value;
        }
        return null;
      });
  },

  getSkypeByUserIdAndSkypeValue({user_id, skype}) {
    return DatabaseService.runSql(`SELECT * from user_contacts WHERE 
        user_id=${user_id} AND 
        value='${skype}' AND 
        type=${ConstantServie.SKYPE};
    `)
      .then((data) => {
        if (data.length) {
          return data[0];
        }
        return null;
      });
  },

  addSkype({user_id, skype}) {
    this.getSkypeByUserIdAndSkypeValue({user_id, skype})
      .then(skype => {
        if (skype) {
          return skype;
        }
        return DatabaseService.runSql(`INSERT INTO user_contacts (user_id, type, value) 
          VALUES ('${user_id}', '${ConstantServie.SKYPE}', '${skype}');`)
      });
  },

  addUserAndDetails(data) {
    let user_id;
    return this.insertUserIfNotExist({name: data.user})
      .then((user) => {
        user_id = user.id;
        return Promise.all(data.carNumber.map((number) =>
          CarService.insertCarIfNotExist({
            user_id,
            number: number,
            brand: data.brand // TODO brand also should be array;
          })
        ));
      })
      .then(() => {
        if (data.phones && data.phones.length) {
          return Promise.all(data.phones.map(mobilePhone => this.addMobilePhone({user_id, mobilePhone})))
        }
      })
      .then(() => {
        if (data.skype) {
          return this.addSkype({user_id, skype: data.skype});
        }
      });
  },

  bulkAddUsers(data) {
    return this.addUserAndDetails(data[0]);
  }
};

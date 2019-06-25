const DatabaseService = require('../services/database.service');

module.exports = {
  // TODO ....
  getUserByNumber(number) {
    return Promise.resolve({
      name: 'test name',
      email: 'vivanch@softserveinc.com',
      skype: 'kori_qwe',
      phoneNumber: '0685435102',
    });
  },

  getAllUsers() {
    return DatabaseService.runSql(`SELECT * FROM users`);
  },

  getUserById(userID) {
    return DatabaseService
      .runSql(`SELECT * FROM users WHERE id = ${userID}`)
      .then(data => {
        if (data && data[0]) {
          return data[0];
        }
      });
  }
};

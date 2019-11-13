const typeorm = require('typeorm');
const { EntitySchema } = typeorm;

const Users = new EntitySchema({
  name: 'Users',
  columns: {
    id: {
      type: Number,
      primary: true
    },
    name: {
      type: String
    }
  }
});

module.exports = Users;

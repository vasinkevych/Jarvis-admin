module.exports = {
  User: `
    type User {
      id: ID
      name: String
      cars: [Car!]
    }
  `,
  UserQueries: `
    users: [User!]!
    user(id: String): User
  `
};

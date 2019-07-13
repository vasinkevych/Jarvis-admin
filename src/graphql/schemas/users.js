module.exports = {
  User: `
    type User {
      id: ID
      name: String
      cars: [Car!]
      mobile: [String]
      skype: String
    }
  `,
  UserQueries: `
    users: [User!]!
    user(id: String): User
  `
};

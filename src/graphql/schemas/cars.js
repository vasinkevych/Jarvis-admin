module.exports = {
  Car: `
    type Car {
      id: ID!
      number: String
      brand: String
      users: [User!]
    }
  `,

  CarRegistration: `
    type CarRegistration {
      id: ID!
      number: String!
      year: String
      date: String
      registration: String
      capacity: Int
      owner_hash: String
      color: String
      kind: String
      own_weight: Int
      reg_addr_koatuu: String
      dep_code: String
      dep: String
    }
  `,

  CarQueries: `
    cars: [Car!]!
    car(id: ID!): Car
    carsLikeNumber(number: String): [Car]
    carRegistrations(carNumber: String): [CarRegistration]
  `
};

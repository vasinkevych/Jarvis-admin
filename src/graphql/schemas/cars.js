module.exports = {
  Car: `
    type Car {
      id: ID!
      number: String
      brand: String
      users: [User!]
    }
  `,
  CarQueries: `
    cars: [Car!]!
    car(id: ID!): Car  
    carsLikeNumber(number: String): [Car]
  `
};

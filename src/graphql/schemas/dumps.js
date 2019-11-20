module.exports = {
  Dump: `
    type Dump {
      id: ID!
      name: String!
      created: String!
    }
  `,
  DumpQueries: `
    dumps: [Dump!]!
  `
};

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// #region const
// For the purposes of this tutorial, we'll hardcode our example data.
const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

//For this contrived example, assume our server defines the following hardcoded array:
const users = [
    {
        id: '1',
        name: 'Elizabeth Bennet',
    },
    {
        id: '2',
        name: 'Fitzwilliam Darcy',
    },
];
// #endregion

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type User {
    id: ID
    name: String
  }

  type Query {
    books: [Book]
    numberSix: Int!
    numberSeven: Int!
    user(id: ID!): User
  }

  type Mutation {
    downloadFiles(files: [FileInput]!): Boolean
  }

  input FileInput {
    url: String!
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: () => books,
        numberSix() {
            return 6;
        },
        numberSeven() {
            return 7;
        },
        user(parent, args, contextValue, info) {
            return users.find((user) => user.id === args.id);
        },
    },
    Mutation: {
        downloadFiles: async (parent, { files }, context) => {
            files.forEach((file) => {
                console.log(`Fetching file: ${file.url}`);
                // Simulate file fetching
            });
            return true;
        },
    },
};

// // OUR SAMPLE
// // const downloadFiles = createResolver<MutationDownloadFilesArgs, bool>({
// //     resolver: async ({ args: { files }, ctx }) => {
// //         files.forEach((file) => {
// //             logger.debug`Fetchin file`({
// //                 traceId: ctx.traceId,
// //             });
// //             fetch(file.url);
// //         });
// //         return true;
// //     });

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
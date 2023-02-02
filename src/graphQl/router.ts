import { ApolloServer, gql } from "apollo-server";
import TodoModels from "../todo/model";

const typeDefs = gql`
  type Todo {
    uuid: String!
    title: String!
    done: String!
    userId: String!
    createtAt: String!
    updatetAt: String!
  }
  type Query {
    getAll: [Todo]
  }
`;

const resolvers = {
  Query: {
    getAll: async () => {
      try {
        const todos = await TodoModels.find();
        return todos;
      } catch (error) {
        return error;
      }
    },
  },
};

const Server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default Server;

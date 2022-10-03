import { createServer } from "graphql-yoga";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";

const server = createServer ({
    schema: {
        typeDefs,
        resolvers
    }
});

server.start({ port: 3000}, ({ port }) => {
    console.log("Server running. Port: ", port);
})
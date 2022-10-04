const express = require("express");
const { createServer } = require("http")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const { SubscriptionServer } = require("subscriptions-transport-ws")
const { execute, subscribe } = require("graphql");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose")
const typeDefs = require("./graphql/typeDefs.js")
const resolvers = require("./graphql/resolvers.js")

const MONGODB = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

(async function(){
    const app = express();
    const httpServer = createServer(app);

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    })

    const subscriptionServer = SubscriptionServer.create(
        {schema, execute, subscribe},
        {server: httpServer, path: '/graphql'}
    )

    const server = new ApolloServer({
        schema,
        plugins: [
            {
                async serverWillStart(){
                    return {
                        async drainServer() {
                            subscriptionServer.close()
                        }
                    }
                }
            }
        ]
    })

    await server.start()
    server.applyMiddleware({app})

    mongoose.connect(MONGODB, {useNewUrlParser: true})

    const PORT = 4000
    httpServer.listen(PORT, () => console.log("Http server running on port" + PORT))
})()
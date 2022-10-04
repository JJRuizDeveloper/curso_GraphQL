export const typeDefs = `
    type Review {
        id: ID!
        text: String @deprecated(reason: "Use comment instead.")
        comment: String!
        book: Book! 
    }
 
    type Book {
        id: ID!
        title: String!
        author: Author!
        reviews: [Review]!
    }

    type Author {
        id: ID!
        name: String!
        books: [Book]!
    }

    type Query {
        authors(query: String): [Author]!
        books: [Book]!
        reviews: [Review]!
    }

    type Subscription {
        countdown(from: Int!): Int!
    }
`
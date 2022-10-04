export const typeDefs = `
    type Review {
        id: ID!
        """ Suponemos que el campo text ha sido depreciado, le pasamos un argumento con la razón del por qué (indicando que se utilizará el campo comment) """
        text: String @deprecated(reason: "Use comment instead")
        comment: String!
        """ Relación Muchos a 1 con los tipos Book, Author y Forum """
        book: Book!
        forum: Forum!
    }

    type Book {
        id: ID!
        title: String!
        """ Relación Muchos a 1 con el tipo Author """
        author: Author!
        """ Las Reviews no nos provienen del origen, sin embargo podemos asignarselas (Relación 1 a Muchos)"""
        reviews: [Review]!
    }

    type Author {
        id: ID!
        name: String!
        """ Definimos el campo libros (Relación 1 a Muchos) """
        books: [Book]!
        reviews: [Review]!
    }

    type Forum {
        id: ID!
        name: String!
        """ Relación 1 a Muchos con el campo Reviews """
        reviews: [Review]!
    }

    type Query {
        authors(name: String): [Author]!
        books: [Book]!
        reviews: [Review]!
        forums: [Forum]!
    }
`
import { gql, ApolloServer, UserInputError } from "apollo-server";
import { v4 as uuid } from 'uuid';

const users = [
    {
      "id": 1,
      "name": "Leanne",
      "surname": "Graham",
      "email": "Sincere@april.biz",
      "street": "Kulas Light",
      "city": "Gwenborough",
      "zipCode": "929983874",
      "phone": "1-770-736-8031 x56442",
    },
    {
      "id": 2,
      "name": "Ervin",
      "surname": "Howell",
      "email": "Shanna@melissa.tv",
      "street": "Victor Plains",
      "city": "Wisokyburgh",
      "zipCode": "905667771",
    },
    {
      "id": 3,
      "name": "Clementine",
      "surname": "Bauch",
      "email": "Nathan@yesenia.net",
      "street": "Douglas Extension",
      "city": "McKenziehaven",
      "zipCode": "595904157",
    },
    {
      "id": 4,
      "name": "Patricia",
      "surname": "Lebsack",
      "email": "Julianne.OConner@kory.org",
      "street": "Hoeger Mall",
      "city": "South Elvis",
      "zipCode": "539194257",
      "phone": "493-170-9623 x156",
    },
    {
      "id": 5,
      "name": "Chelsey",
      "surname": "Dietrich",
      "email": "Lucio_Hettinger@annie.ca",
      "street": "Skiles Walks",
      "city": "Roscoeview",
      "zipCode": "33263",
      "phone": "(254)954-1289",
    },
    {
      "id": 6,
      "name": "Mrs. Dennis",
      "surname": "Schulist",
      "email": "Karley_Dach@jasper.info",
      "street": "Norberto Crossing",
      "city": "South Christy",
      "zipCode": "235051337",
      "phone": "1-477-935-8478 x6430",
    },
    {
      "id": 7,
      "name": "Kurtis",
      "surname": "Weissnat",
      "email": "Telly.Hoeger@billy.biz",
      "street": "Rex Trail",
      "city": "Howemouth",
      "zipCode": "588041099",
      "phone": "210.067.6132",
    },
    {
      "id": 8,
      "name": "Nicholas",
      "surname": "Runolfsdottir V",
      "email": "Sherwood@rosamond.me",
      "street": "Ellsworth Summit",
      "city": "Aliyaview",
      "zipCode": "45169",
      "phone": "586.493.6943 x140",
    },
    {
      "id": 9,
      "name": "Glenna",
      "surname": "Reichert",
      "email": "Chaim_McDermott@dana.io",
      "street": "Dayna Park",
      "city": "Bartholomebury",
      "zipCode": "764953109",
      "phone": "(775)976-6794 x41206",
    },
    {
      "id": 10,
      "name": "Clementina",
      "surname": "DuBuque",
      "email": "Rey.Padberg@karina.biz",
      "street": "Kattie Turnpike",
      "city": "Lebsackbury",
      "zipCode": "314282261",
      "phone": "024-648-3804",
    }
];

const typeDefs = gql`
"""
esto
es
mi
comentario
"""
    enum YesNo {
      YES
      NO
    }

    type User {
        id: ID!
        name: String!
        surname: String!
        fullName: String!
        street: String!
        zipCode: Int!
        address: String!
        city: String!
        phone: String
    }

    type Query {
        allUsers(phone: YesNo): [User]!
        userCount: Int!
        findUserById(id: ID!): User
        findUserByName(name: String!): User
    }

    type Mutation {
        addUser(
            name: String!
            surname: String!
            street: String!
            zipCode: Int!
            city: String!
            phone: String
        ): User
    }
`;

const resolvers = {
    Query: {
        allUsers: (_, { phone }) => {
          if (!phone) return users;
          if (phone === 'YES') return users.filter(user => user.phone !== undefined);
          return users.filter(user => user.phone === undefined);
        },
        userCount: () => users.length,
        findUserById: (_, { id }) => users.find(user => user.id == id),
        findUserByName: (_, { name }) => users.find(user => user.name == name),
    },
    User: {
        fullName: (root) => `${root.name} ${root.surname}`,
        address: (root) => `${root.street}, ${root.city}, ${root.zipCode}`,
    },
    Mutation: {
        addUser: (root, user) => {
            console.log('called');
            throw new UserInputError('uwu!', {
                invalidArgs: user.phone,
                invalidField: 'phone',
                a: 'b'
            });
            const newUser = { ...user };
            newUser.id = uuid();
            users.push(newUser);
            return newUser;
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => { console.log(`Started at ${url}`); });
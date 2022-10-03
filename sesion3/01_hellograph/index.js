import { ApolloServer, gql, UserInputError } from 'apollo-server'
import {v1 as uuid} from 'uuid'
import axios from 'axios'

const users = [
    {
        id: 1,
        name: "Juanjo",
        surname: "Ruiz",
        street: "Calle demo 21",
        zipCode: 20010,
        city: "Málaga",
        phone: '+34600000000'
    },
    {
        id: 2,
        name: "Alfonso",
        surname: "Perez",
        street: "Calle demo 23",
        zipCode: 20010,
        city: "Málaga",
        phone: '+34600004500'
    },
    {
        id: 3,
        name: "Pedro",
        surname: "López",
        street: "Calle margarita 1",
        zipCode: 27010,
        city: "Madrid",
        phone: '+34602200000'
    },
    {
        id: 4,
        name: "Agustín",
        surname: "Romero",
        street: "Avenida luis 9",
        city: "Salamanca",
        zipCode: 27010
    },
    {
        id: 5,
        name: "Yassine",
        surname: "Ruiz",
        street: "Calle Amaploa 15",
        city: "Toledo",
        zipCode: 25010
    }
]

const typeDefinitions = gql`
    enum YesNo {
        YES
        NO
    }

    type User {
        id: ID!
        name: String!
        surname: String!
        street: String!
        zipCode: Int!
        phone: String
        city: String!
        address: String
    }

    type Owner {
        name: String!
        car: [Car]!
    }

    type Car {
        plate: String!
        brand: String!
        model: String!
        owner: [Owner] @relation
    }



    type Query {
        allUsers(phone: YesNo): [User]!
        userCount: Int!
        findUserByName(name:String!): User
        findUserById(id:ID!): User
    }

    type Mutation {
        addUser(
            name: String!
            surname: String!
            street: String!
            zipCode: Int!
            phone: String
            city: String!
            ): User
        editPhone(
            name: String!
            phone: String!
        ): User
    }
`

const resolvers = {
    Mutation: {
        addUser: (root, args) => {
            if(users.find( user  => user.name === args.name)) {
                throw new UserInputError(`Name ${args.name} already exists and must be unique.`, {
                    invalidArgs: args.name
                })
            }
            const user = {...args, id: uuid()}
            users.push(user)
            return user
        },
        editPhone: (root, args) => {
           const userIndex = users.findIndex(user => user.name === args.name)
           if(userIndex === -1) return null
           const user = users[userIndex]
           const updatedUser = {...user, phone: args.phone}
           users[userIndex] = updatedUser
           return updatedUser
        }
    },
    Query: {
        allUsers: async (root, args) => {
            const usersFromAPI = await axios.get('http://127.0.0.1:8055/items/users')
            const users = usersFromAPI.data.data
            if(!args.phone) return users
            return users.filter(user => { return args.phone === "YES" ? user.phone : !user.phone })
        },
        userCount: () => users.length,
        findUserByName: (root, args) => {
            const { name } = args
            return users.find( user => user.name === name)
        },
        findUserById: (root, args) => {
            const { id } = args
            return users.find( user => user.id === id)
        }
    },
    User: {
        address: (root) => `${root.street}, ${root.zipCode}, ${root.city}`
    }
}

const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers
})

server.listen().then( ({url}) => {
    console.log(`Server ready at ${url}`)
} )
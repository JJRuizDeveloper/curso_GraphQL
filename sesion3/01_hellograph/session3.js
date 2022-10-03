import { ApolloServer, gql, UserInputError } from 'apollo-server'
import {v1 as uuid} from 'uuid'

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
        allUsers: (root, args) => {
            if (!args.phone) return users
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



// 1. Hacer un enum. Modificar addUser
// 2. Hacer un mutation edit Number
// 3. Queries compuestas y alias

 /*   query {
        userCount
        allUsersData: allUsers {
            name
        }
        usersWithPhone: allUsers(phone:YES) {
            name
        }
        usersWithoutPhone: allUsers(phone:NO) {
            name
        }
    } */

// 4. Obtener los datos desde una API REST para componer el GraphQL (Igual que Directus)
    // Crear servidor Directus con la misma estructura de datos
    // Leer los datos desde directus. Para ello:
        // npm install axios
        // import axios from 'axios'
        // En la Qruey allUsers:
            /* allUsers: async (root.args) => {
                const {data: personsFromApi} = await axios.get('http://127.0.0.1....')
            }
            (el resto igual)
            */

// 5. Ejercicio: Realizar los cambios para el resto de funciones.
// 6. Realizar un directus con relaciones y realizar consultas con playground para ver cómo funciona.
// 7. Campos con relaciones en Graphql: https://docs.fauna.com/fauna/current/api/graphql/relationships
// 8. Ejercicio: Realizar las relaciones de cursos con profesores.
// 9. Realizar un nuevo proyecto con posts, categorías y autores y definirlo completo, incluyendo relaciones.
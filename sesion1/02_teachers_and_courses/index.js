import { gql, ApolloServer } from 'apollo-server'
import { makeExecutableSchema } from '@graphql-tools/schema';
import { DateTimeResolver, DateTimeTypeDefinition } from "graphql-scalars"
// import { ApolloServer } from 'apollo-server-express'

const teachers = [
    {
        id: 1,
        age: 34,
        name: 'Perico',
        surname: 'de los Palotes',
        idCard: '11111111111X',
        street: 'Calle demo 21',
        zipCode: 28004,
        city: 'Madrid',
        skills: [ "Tech" ]
    },
    {
        id: 2,
        age: 34,
        name: 'Juan',
        surname: 'de los Palotes',
        idCard: '2222222222X',
        street: 'Calle demo2 21',
        zipCode: 28005,
        city: 'Madrid',
        skills: [ "English language", "Flowers care" ]
    },
    {
        id: 3,
        age: 32,
        name: 'Juanita',
        surname: 'de la Palita',
        idCard: '33333333333X',
        street: 'Calle demo3 21',
        zipCode: 28006,
        city: 'Madrid',
        skills: [ ]
    },
]

const courses = [
    {
        id: 1,
        name: "JAMStack",
        initDate: "9/17/2022",
        endDate: "9/27/2022",
        hours: 35
    },
    {
        id: 2,
        name: "GraphQL",
        initDate: "9/27/2022",
        endDate: "10/5/2022",
        hours: 35
    },
    {
        id: 3,
        name: "Botanic",
        initDate: "9/17/2022",
        endDate: "12/5/2022",
        hours: 35
    },
]

const typeDefs = gql`
    type Teacher {
        id: ID!
        age: Int
        name: String!
        surname: String!
        idCard: String
        street: String!
        zipCode: Int!
        city: String!
        address: String!
        skills: [String]
        hasTechSkill: Boolean!
    }

    type Course {
        id: ID!
        name: String!
        initDate: String!
        endDate: String!
        hours: Int!
        isActive: Boolean!
    }

    type Query {
        allTeachers: [Teacher]!
        teachersCount: Int!
        findTeachersByName(name: String!): [Teacher]
        findTeacherById(id: ID!): Teacher
        allCourses: [Course]!
        coursesCount: Int!
        findCoursesByName(name: String!): [Course]
        findCourseById(id: ID!): Course
        findActiveCourses: [Course]
    }
`

const isActive = (course) => {
    const now = new Date()
    return (new Date(course.initDate) < now) && (new Date(course.endDate) > now)
}

const resolvers = {
    Query: {
        allTeachers: () => teachers,
        teachersCount: () => teachers.length,
        findTeacherById: (root, args) => {
            const { id } = args
            return teachers.find( teacher => teacher.id === parseInt(id))
        },
        findTeachersByName: (root, args) => {
            const { name } = args
            return teachers.filter( teacher => teacher.name === name)
        },
        allCourses: () => courses,
        coursesCount: () => courses.length,
        findCourseById: (root, args) => {
            const { id } = args
            return courses.find( course => course.id === parseInt(id))
        },
        findCoursesByName: (root, args) => {
            const { name } = args
            return courses.filter( course => course.name === name)
        },
        findActiveCourses: (root, args) => {
            return courses.filter( course => isActive(course))
        }
    },
    Teacher: {
        id: (root) => Number(root.id).toString(),
        hasTechSkill: (root) => root.skills.find((skill) => skill === "Tech") != undefined,
    },
    Course: {
        id: (root) => Number(root.id).toString(),
        isActive: (root) => isActive(root)
    }
}

// const server = new ApolloServer({
//     schema: makeExecutableSchema({
//         typeDefs: [
//           ...DateTimeTypeDefinition
//         ],
//         resolvers: {
//           ...DateTimeResolver
//         },
//     })
// })

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url}) => console.log(`Server listening on ${url}`))
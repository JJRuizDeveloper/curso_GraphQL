import { ApolloServer, gql, UserInputError } from "apollo-server"
import { v1 as uuid } from 'uuid'

//Describimos los datos
const teachers = [
    {
        id: 1,
        age: 30,
        name: "Josefa",
        surname: "Díaz",
        idCard: "76000123X",
        street: "Calle Primera 3",
        zipCode: "37188",
        city: "Salamanca",
        skills: [ "Art", "Literature" ]
    },
    {
        id: 2,
        age: 40,
        name: "Pedro",
        surname: "Fajardo",
        idCard: "76123456F",
        street: "Calle Rincón 6",
        zipCode: "10600",
        city: "Cáceres",
        skills: [ "Tech", "Maths" ]
    }
]

const courses = [
    {
       id: 1,
       name: "GraphQL",
       initDate: "2022-09-27",
       endDate: "2022-10-04",
       hours: 30,
    },
    {
        id: 2,
        name: "Easy write",
        initDate: "2022-11-02",
        endDate: "2022-11-05",
        hours: 20,
     }
]

const typeDefinitions = gql`
    enum StateCurso {
        DRAFT
        PUBLISH
    }

    type Teacher {
        id: ID!
        age: Int!
        name: String!
        surname: String!
        idCard: String
        street: String!
        zipCode: String!
        city: String
        address: String
        skills: [String]
        hasTechSkill: Boolean
    }

    type Course {
        id: ID!
        name: String!
        initDate: String!
        endDate: String
        hours: Int!
        isActive: Boolean!
    }

    type Query {
        allTeacher: [Teacher]!
        allCourse(state: StateCurso): [Course]!
        findTeacherById(id:ID!): Teacher
        findCourseById(id:ID!): Course
    }

    type Mutation {
        addTeacher(
            age: Int!
            name: String!
            surname: String!
            idCard: String
            street: String!
            zipCode: String!
            city: String
            skills: [String]
            ): Teacher
        addCourse(
            name: String!
            initDate: String!
            endDate: String
            hours: Int!
            ): Course
        editTeacher(
            name: String!
            street: String!
            zipCode: String!
            city: String
            ): Teacher
        editCourse(
            name: String!
            initDate: String!
            endDate: String
            ): Course
    }
`

const resolvers = {
    Query: {
        allTeacher: () => teachers,
        allCourse: (root, args) => {
            if (!args.state) return courses
            const currentDate = new Date();

            return courses.filter(x => { return args.state == "PUBLISH" ? calculateCourseActive(x) : !calculateCourseActive(x)})
            // if (args.state == "PUBLISH"){
            //     return courses.filter(x => currentDate.getTime() >= new Date(x.initDate).getTime() && currentDate.getTime() <= new Date(x.endDate).getTime())
            // }
            // else{
            //     return courses.filter(x => currentDate.getTime() < new Date(x.initDate).getTime() || currentDate.getTime() > new Date(x.endDate).getTime())
            // }
        },
        findTeacherById: (root, args) => {
            const {id} = args;

            return teachers.find(teacher => teacher.id == id);
        },
        findCourseById: (root, args) => {
            const {id} = args;

            return courses.find(course => course.id == id);
        }
    },
    Teacher: {
        address: (root) => `${root.street}, ${root.zipCode} ${root.city}`,
        hasTechSkill: (root) => {
            return root.skills.find(skill => skill == 'Tech') ? true : false;
        }
    },
    Course: {
        isActive: (root) => {
            /*
            const initDate = new Date(root.initDate)
            const endDate = new Date(root.endDate)
            const currentDate = new Date();

            return (currentDate.getTime() >= initDate.getTime() && currentDate.getTime() <= endDate.getTime()) ? true : false;
            */
            return calculateCourseActive(root)
        }
    },
    Mutation: {
        addTeacher: (root, args) => {

            const {age, name, surname, idCard, street, zipCode, city, skills} = args

            //solo permitimos que el nombre sea único
            const userInputError = []

            if (teachers.find(x => x.name == name)) {
                //No lo vamos a insertar
                userInputError.push(new UserInputError("El nombre de usuario ya existe", {
                    invalidArgs: name,
                    invalidField: 'name'
                }))
            }
            if (teachers.find(x => x.idCard == idCard)) {
                //No lo vamos a insertar
                userInputError.push(new UserInputError("El DNI ya existe", {
                    invalidArgs: zipCode,
                    invalidField: 'zipCode'
                }))
            }            

            if (userInputError.length > 0) {
                throw userInputError;
            }

            //otro modo
            const teacher = {...args, id: uuid()}

            teachers.push(teacher);

            return teacher;
        },
        addCourse: (root, args) => {
            const {name, initDate, endDate, hours} = args

            //solo permitimos que el nombre sea único
            const userInputError = []

            if (courses.find(x => x.name == name)) {
                //No lo vamos a insertar
                userInputError.push(new UserInputError("El nombre del curso ya existe", {
                    invalidArgs: name,
                    invalidField: 'name'
                }))
            }
            if (endDate !== null && new Date(initDate).getTime() > new Date(endDate).getTime()) {
                //No lo vamos a insertar
                userInputError.push(new UserInputError("La fecha de fin debe ser posterior a la de inicio", {
                    invalidArgs: endDate,
                    invalidField: 'endDate'
                }))
            }

            if (userInputError.length > 0) {
                throw userInputError;
            }

            //otro modo
            const course = {...args, id: uuid()}

            courses.push(course);

            return course;
        },
        editTeacher: (root, args) => {
            //tenemos como premisa que el usuario es unico y obligatorio
            const index = teachers.findIndex(x => x.name == args.name)

            // si no lo encontramos
            if (index == -1) return null

            const teacher = teachers[index]
            const updateTeacher = {...teacher, street: args.street, zipCode: args.zipCode, city: args.city}

            teachers[index] = updateTeacher
            return updateTeacher
        },
        editCourse: (root, args) => {
            //tenemos como premisa que el usuario es unico y obligatorio
            const index = courses.findIndex(x => x.name == args.name)

            // si no lo encontramos
            if (index == -1) return null

            const course = courses[index]
            const updateCourse = {...course, initDate: args.initDate, endDate: args.endDate}

            courses[index] = updateCourse
            return updateCourse
        }
    }
}

const calculateCourseActive = (course) => {
    const initDate = new Date(course.initDate)
    const endDate = new Date(course.endDate)
    const currentDate = new Date();    

    return (currentDate.getTime() >= initDate.getTime() && currentDate.getTime() <= endDate.getTime()) ? true : false;
}

const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers: resolvers
})

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
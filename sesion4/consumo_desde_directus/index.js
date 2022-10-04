import { gql, ApolloServer, UserInputError } from "apollo-server";
import { GraphQLScalarType } from "graphql";
import { toDate } from "./impl/utils.js";
import { teachers, courses } from "./data/index.js";
import { isActive, validateCourse } from "./impl/courses.js";
import { v4 as uuid } from "uuid";
import axios from 'axios';

const DIRECTUS_URL = 'http://localhost:8055';

const typeDefs = gql`
    scalar Date

    enum Strictness {
        STRICT
        LAX
    }

    type Teacher {
        id: ID!
        age: Int!
        name: String!
        surname: String!
        idCard: String!
        street: String!
        zipCode: String!
        city: String!
        address: String!
        skills: [String]!
        hasTechSkill: Boolean!
    }

    type Course {
      id: ID!
      name: String!
      initDate: Date!
      endDate: Date!
      hours: Int!
      isActiveToday: Boolean
    }

    type Query {
        allTeachers: [Teacher]
        allCourses: [Course]
        findActiveCourses(date: Date!): [Course]
    }

    type Mutation {
        addTeacher(
            age: Int!
            name: String!
            surname: String!
            idCard: String!
            street: String!
            zipCode: String!
            city: String!
            skills: [String]!
        ): Teacher
        addCourse(
            name: String!
            initDate: Date!
            endDate: Date!
            hours: Int!
        ): Course

        addTeacherSkills(
            teacherId: ID!
            skills: [String!]!
            strictness: Strictness!
        ): Teacher

        removeTeacherSkills(
            teacherId: ID!
            skills: [String!]!
            strictness: Strictness!
        ): Teacher

        editCourse(
            id: ID!
            name: String
            initDate: Date
            endDate: Date
            hours: Int
        ): Course
    }
`;

const resolvers = {
    Query: {
        allTeachers: async () => (await axios.get(`${DIRECTUS_URL}/items/teachers`)).data.data,
        allCourses: async () => (await axios.get(`${DIRECTUS_URL}/items/courses`)).data.data,
        findActiveCourses: async (root, { date }) => {
            const dateString = date.toISOString();
            const request = await axios.get(`${DIRECTUS_URL}/items/courses?filter[initDate][_lte]=${dateString}&filter[endDate][_gte]=${dateString}`)
            return request.data.data;
        },
    },
    Teacher: {
        address: (root) => `${root.street}, ${root.city}, ${root.zipCode}`,
        hasTechSkill: (root) => root.skills?.includes('tech') ?? false,
        skills: (root) => root.skills ?? [],
    },
    Course: {
        isActiveToday: (root) => isActive(root, new Date()),
    },
    Date: new GraphQLScalarType({
        name: 'Date',
        parseValue(value) {
            //throw new UserInputError('Invalid date format');
            return toDate(value);
        },
        serialize(value) {
            if (value instanceof Date)
                return value.toISOString();
            return new Date(value).toISOString();
        },
        parseLiteral(value) {
            return new Date(value);
        },
    }),
    Mutation: {
        addTeacher: async (root, teacher) => {
            if (teacher.age < 18)
                throw new UserInputError("Too young");
            if (teachers.some(t => t.idCard.toLowerCase() === teacher.idCard.toLowerCase()))
                throw new UserInputError("ID card already exists");

            const request = await axios.post(`${DIRECTUS_URL}/items/teachers`, teacher);
            return request.data.data;
        },
        addCourse: async (root, course) => {
            validateCourse(course);
            
            const request = await axios.post(`${DIRECTUS_URL}/items/courses`, course);
            return request.data.data;
        },
        addTeacherSkills: async (root, { teacherId, skills, strictness }) => {
            let teacher;
            try {
                const request = await axios.get(`${DIRECTUS_URL}/items/teachers/${teacherId}`);
                teacher = request.data.data
            } catch (err) {
                throw new UserInputError("No such teacher");
            }

            if (strictness === 'STRICT' && teacher.skills.some(skill => skills.includes(skill)))
                return new UserInputError("Some skills exist already");

            skills.forEach(skill => {
                if (!teacher.skills.includes(skill)) teacher.skills.push(skill);
            });
            const request = await axios.patch(`${DIRECTUS_URL}/items/teachers/${teacherId}`, {
                skills: teacher.skills,
            });
            return request.data.data;
        },
        removeTeacherSkills: async (root, { teacherId, skills, strictness }) => {
            let teacher;
            try {
                const request = await axios.get(`${DIRECTUS_URL}/items/teachers/${teacherId}`);
                teacher = request.data.data
            } catch (err) {
                throw new UserInputError("No such teacher");
            }

            if (strictness === 'STRICT'
            && skills.some(skill => teacher.skills.indexOf(skill) < 0))
                throw new UserInputError("Some skills do not exist");

            skills.forEach(skill => {
                const index = teacher.skills.indexOf(skill);
                if (index < 0) return;
                teacher.skills.splice(index, 1);
            });
            
            const request = await axios.patch(`${DIRECTUS_URL}/items/teachers/${teacherId}`, {
                skills: teacher.skills,
            });
            return request.data.data;
        },
        editCourse: async (root, courseData) => {
            let course;
            try {
                const request = await axios.get(`${DIRECTUS_URL}/items/courses/${courseData.id}`);
                course = request.data.data
            } catch (err) {
                throw new UserInputError("No such course");
            }
            const newCourse = { ...course, ...courseData };
            validateCourse(newCourse);

            const request = await axios.patch(`${DIRECTUS_URL}/items/courses/${courseData.id}`, newCourse);
            return request.data.data
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => { console.log(`Started at ${url}`); });
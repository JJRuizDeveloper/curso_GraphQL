<template>
    <div class="container">
        <div class="row mt-1">
            <h2>Teachers from Apollo Server</h2>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col text-center">ID</th>
                        <th scope="col text-center">Age</th>
                        <th scope="col text-center">Name</th>
                        <th scope="col text-center">Surname</th>
                        <th scope="col text-center">Id Card</th>
                        <th scope="col text-center">Street</th>
                        <th scope="col text-center">Zip Code</th>
                        <th scope="col text-center">City</th>
                        <th scope="col text-center">Skills</th>
                        <th scope="col text-center">Address</th>
                        <th scope="col text-center">Has Tech Skill?</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="teacher in fetchAllTeachers" :key="teacher.id">
                        <td>{{ teacher.id }}</td>
                        <td>{{ teacher.age }}</td>
                        <td>{{ teacher.name }}</td>
                        <td>{{ teacher.surname }}</td>
                        <td>{{ teacher.idCard }}</td>
                        <td>{{ teacher.street }}</td>
                        <td>{{ teacher.zipcode }}</td>
                        <td>{{ teacher.city }}</td>
                        <td>{{ teacher.skills }}</td>
                        <td>{{ teacher.address }}</td>
                        <td>{{ teacher.hasTechSkill }}</td>
                    </tr>
                </tbody>
            </table>

            <h2>Courses from Apollo Server</h2>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col text-center">ID</th>
                        <th scope="col text-center">Name</th>
                        <th scope="col text-center">Init Date</th>
                        <th scope="col text-center">End Date</th>
                        <th scope="col text-center">Hours</th>
                        <th scope="col text-center">Is Active On Date?</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="course in fetchAllCourses" :key="course.id">
                        <td>{{ course.id }}</td>
                        <td>{{ course.name }}</td>
                        <td>{{ course.initDate }}</td>
                        <td>{{ course.endDate }}</td>
                        <td>{{ course.hours }}</td>
                        <td>{{ course.isActiveOnDate }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";
import { defineComponent } from "vue";

export default defineComponent({
    apollo: {
        $client: 'apolloClient',
        fetchAllTeachers: {
            query: gql`
                query {
                    fetchAllTeachers: allTeachers {
                        id
                        age
                        name
                        surname
                        idCard
                        street
                        zipcode
                        city
                        skills
                        address
                        hasTechSkill
                    }
                }
            `
        },
        fetchAllCourses: {
            query: gql`
                query ($date: Date!) {
                    fetchAllCourses: allCourses {
                        id
                        name
                        initDate
                        endDate
                        hours
                        isActiveOnDate(date: $date)
                    }
                }
            `,
            variables: {
                "date": "2022-09-28"
            }
        }
    },
    data() {
        return {
            fetchAllTeachers: [],
            fetchAllCourses: []
        }
    }
})
</script>
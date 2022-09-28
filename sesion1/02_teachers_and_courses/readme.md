``` graphql
query {
  allTeachers {
    name
    skills
    hasTechSkill
  }
  allCourses {
    name
    isActive
  }
  findActiveCourses {
    name
    initDate
    endDate
  }
}
```
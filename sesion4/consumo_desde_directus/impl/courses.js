import { toDate } from './utils.js';
import { UserInputError } from "apollo-server";

export function isActive(course, date) {
    return toDate(course.initDate) <= date && toDate(course.endDate) >= date;
}

export function validateCourse(course) {
    if (course.initDate >= course.endDate)
        throw new UserInputError("Invalid start and end dates");
    if (course.hours > 24)
        throw new UserInputError("Days have 24 hours uh?");

    return true;
}
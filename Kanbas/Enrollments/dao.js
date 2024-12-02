import Database from "../Database/index.js";
export function enrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;
    enrollments.push({ _id: Date.now(), user: userId, course: courseId });
}

export function unenrollUserFromCourse(enrollmentId) {
    Database.enrollments = Database.enrollments.filter((e) => e._id !== enrollmentId);
}
// Find all enrollments
export function findAllEnrollments() {
    return Database.enrollments;
}

// Find courses a user is enrolled in
export function findCoursesForEnrolledUser(userId) {
    const { enrollments, courses } = Database;
    return courses.filter((course) =>
                              enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id)
    );
}

export function findUsersForCourse(courseId) {
    const { enrollments, users } = Database;
    const enrolledUserIds = enrollments
        .filter((enrollment) => enrollment.course === courseId)
        .map((enrollment) => enrollment.user);

    return users.filter((user) => enrolledUserIds.includes(user._id));
}

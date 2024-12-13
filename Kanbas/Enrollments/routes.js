import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
    // Enroll a user in a course
    app.post("/api/enrollments", async (req, res) => {
        const { userId, courseId } = req.body; // Extract userId and courseId from request body
        if (!userId || !courseId) {
            res.status(400).json({ message: "User ID and Course ID are required" });
            return;
        }
        const newEnrollment = await dao.enrollUserInCourse(userId, courseId);
        res.status(201).json(newEnrollment);
    });

    // Unenroll a user from a course
    app.delete("/api/enrollments/:enrollmentId", async (req, res) => {
        const { enrollmentId } = req.params; // Extract enrollmentId from request parameters
        await dao.unenrollUserFromCourse(enrollmentId);
        res.status(200).send({ message: "User unenrolled successfully" });
    });

    // Find courses a user is enrolled in
    app.get("/api/users/:userId/courses", async (req, res) => {
        const { userId } = req.params; // Extract userId from request parameters
        const courses = await dao.findCoursesForEnrolledUser(userId);
        res.status(200).json(courses);
    });

    // Fetch all enrollments
    app.get("/api/enrollments", async (req, res) => {
        const enrollments = await dao.findAllEnrollments();
        res.status(200).json(enrollments);
    });

    // Fetch users for a course
    app.get("/api/courses/:courseId/users", async (req, res) => {
        const { courseId } = req.params;
        const users = await dao.findUsersForCourse(courseId);
        res.json(users);
    });

    // Fetch enrollments for a course
    app.get("/api/courses/:courseId/enrollments", async (req, res) => {
        const { courseId } = req.params;
        const enrollments = await dao.findEnrollmentsForCourse(courseId);
        res.json(enrollments);
    });
}

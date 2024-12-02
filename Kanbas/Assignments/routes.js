import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
    // Delete an assignment
    app.delete("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const status = dao.deleteAssignment(assignmentId);
        if (status) {
            res.sendStatus(204); // No Content
        } else {
            res.status(404).json({ message: "Assignment not found" });
        }
    });

    // Get all assignments
    app.get("/api/assignments", (req, res) => {
        const assignments = dao.findAllAssignments();
        res.json(assignments);
    });

    // Get assignments for a course
    app.get("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignments = dao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    });

    // Get an assignment by ID
    app.get("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const assignment = dao.findAssignmentById(assignmentId);
        if (assignment) {
            res.json(assignment);
        } else {
            res.status(404).json({ message: "Assignment not found" });
        }
    });

    app.post("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params; // Extract courseId from the URL
        const newAssignment = dao.createAssignment(courseId, req.body); // Pass courseId and assignment details
        res.status(201).json(newAssignment); // Return the created assignment
    });


    // Update an assignment
    app.put("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        const updatedAssignment = dao.updateAssignment(assignmentId, assignmentUpdates);
        if (updatedAssignment) {
            res.json(updatedAssignment);
        } else {
            res.status(404).json({ message: "Assignment not found" });
        }
    });
}
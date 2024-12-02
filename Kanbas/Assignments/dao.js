import Database from "../Database/index.js";

export function findAllAssignments() {
    return Database.assignments;
}
export function findAssignmentsForCourse(courseId) {
    return Database.assignments.filter((assignment) => assignment.course === courseId);
}

export function findAssignmentById(assignmentId) {
    return Database.assignments.find((assignment) => assignment._id === assignmentId);
}


export function createAssignment(courseId, assignment) {
    const newAssignment = {
        ...assignment,
        _id: Date.now().toString(), // Generate a unique ID
        course: courseId           // Associate assignment with the course
    };
    Database.assignments = [...Database.assignments, newAssignment]; // Add to assignments
    return newAssignment;
}

export function deleteAssignment(assignmentId) {
    const { assignments } = Database;
    Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
}

export function updateAssignment(assignmentId, updates) {
    const { assignments } = Database;
    const assignment = assignments.find((a) => a._id === assignmentId);
    if (!assignment) return null;
    Object.assign(assignment, updates);
    return assignment;
}
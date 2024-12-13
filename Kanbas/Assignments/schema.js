import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
        title: {
            type: String, required: true,
            trim: true,  minlength: 1
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseModel",
            required: true
        },
        description: String,
        points: {
            type: Number,
            default: 100,
            min: 0
        },
        dueDate: {
            type: Date,
            default: Date.now
        },
        availableFromDate: {
            type: Date,
            default: Date.now
        },
        availableUntilDate: {
            type: Date,
            default: () => new Date(+new Date() + 7*24*60*60*1000)
        }
    },
    { collection: "assignments" }
);

export default assignmentSchema;
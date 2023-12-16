import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: false
    },
    time: {
        type: String,
        required: false
    },
    duration: {
        type: Number,
        required: false
    },
    location: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    attendants: {
        type: Number,
        required: false
    },
    user: {
        type: ObjectId,
        required: true
    },
}, {
    timestamps: true
});


const Event = mongoose.model('Event', eventSchema);

export default Event;
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
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    attendants: {
        type: Number,
        required: false
    }
    // user: {
    //     type: Object,
    //     required: true
    // },
}, {
    timestamps: true
});


const Event = mongoose.model('Event', eventSchema);

export default Event;
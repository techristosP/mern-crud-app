import Event from "../models/eventModel.js";

export const validateEvent = async (req) => {
    const events = await Event.find({});
    const { _id, name, description, date, time, location, capacity } = req.body;
    
    const hasDuplicate = events.some( (event) => {
        const isDuplicate = event.location === location && event.date === date && event.time === time;
        if (req.method.toString() === 'POST') {
            // console.log('POST');
            return isDuplicate;
        }
        if (isDuplicate && event._id.toString() !== _id)
            return isDuplicate;
        else
            return false;
    });
    // console.log('hasDuplicate: ', hasDuplicate);

    return !hasDuplicate;
}
import asyncHandler from 'express-async-handler';
import Event from '../models/eventModel.js';

const createEvent = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: 'Create Event' });
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    // console.log(req.body);

    const { name, description, date, time, location } = req.body;

    const event = await Event.create({
        name,
        description,
        date,
        time,
        location
        // user
    });
    console.log('New Event!');
    // console.log(event);

    if (event) {
        res.status(201).json({
            _id: event._id,
            name: event.name,
            description: event.description,
            date: event.date,
            time: event.time,
            location: event.location
            // user: event.user
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid event data');
    }
});

const updateEvent = asyncHandler(async (req, res) => {
    const { _id, name, description, date, time, location } = req.body;

    const event = await Event.findById(_id);

    if (event) {
        event.name = name;
        event.description = description;
        event.date = date;
        event.time = time;
        event.location = location;

        const updatedEvent = await event.save();

        res.status(200).json({
            _id: updatedEvent._id,
            name: updatedEvent.name,
            description: updatedEvent.description,
            date: updatedEvent.date,
            time: updatedEvent.time,
            location: updatedEvent.location
        });
    } else {
        res.status(404);
        throw new Error('Event not found');
    }
});

const getEvents = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: 'Get Events' });
    const events = await Event.find({});
    res.status(200).json(events);
});

export { createEvent, updateEvent, getEvents };
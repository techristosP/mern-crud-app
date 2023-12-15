import asyncHandler from 'express-async-handler';
import Event from '../models/eventModel.js';
import { validateEvent } from '../utils/validateEvent.js';

const createEvent = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: 'Create Event' });
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    const { name, description, date, time, location, capacity } = req.body;

    if (await validateEvent(req)) {
        const event = await Event.create({
            name,
            description,
            date,
            time,
            location,
            capacity,
            attendants: 0,
            user: user._id
        });

        if (event) {
            res.status(201).json({
                _id: event._id,
                name: event.name,
                description: event.description,
                date: event.date,
                time: event.time,
                location: event.location,
                user: event.user
            });

            console.log('New Event: ', event, ' by User: ', user);
        }
        else {
            res.status(400);
            throw new Error('Invalid event data');
        }
    } else {
        res.status(400);
        throw new Error('Event cannot be created at this date, time and location!');
    }

});

const updateEvent = asyncHandler(async (req, res) => {
    const { _id, name, description, date, time, location, capacity } = req.body;

    const event = await Event.findById(_id);

    if (event) {

        if (await validateEvent(req)) {
            event.name = name;
            event.description = description;
            event.date = date;
            event.time = time;
            event.location = location;
            event.capacity = capacity;

            const updatedEvent = await event.save();

            res.status(200).json({
                _id: updatedEvent._id,
                name: updatedEvent.name,
                description: updatedEvent.description,
                date: updatedEvent.date,
                time: updatedEvent.time,
                location: updatedEvent.location,
                capacity: updatedEvent.capacity
            });
        }
        else {
            res.status(400);
            throw new Error('Event cannot be updated at this date, time and location!');
        }
    }
    else {
        res.status(404);
        throw new Error('Event not found');
    }
});

const deleteEvent = asyncHandler(async (req, res) => {
    // console.log(req.body);
    const _id = req.body._id;
    const event = await Event.findById(_id);

    if (event) {
        await Event.deleteOne({ _id });
        res.status(200).json({ message: 'Event removed' });
    }
    else {
        res.status(404);
        throw new Error('Event not found');
    }
});

const getEvents = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: 'Get Events' });
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    try {
        const events = await Event.find({ user: user._id });
        res.status(200).json(events);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

export { createEvent, updateEvent, deleteEvent, getEvents };
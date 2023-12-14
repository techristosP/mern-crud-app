import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

import { useUpdateEventMutation } from '../slices/eventsApiSlice';

const CreateEventScreen = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');

    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const _location = useLocation();
    const event = _location.state;
    // console.log(event);

    // const { userInfo } = useSelector((state) => state.auth);

    const [updateEvent, { isLoading }] = useUpdateEventMutation();

    useEffect(() => {
        setName(event.name);
        setDescription(event.description);
        setDate(event.date);
        setTime(event.time);
        setLocation(event.location);
    }, [event]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await updateEvent({_id: event._id, name, description, date, time, location }).unwrap();            
            toast.success('Event updated successfully!');
            // navigate('/');
        }
        catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <FormContainer>
            <h1>Create Event</h1>

            <Form onSubmit={submitHandler}>

                {/* Name */}
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                {/* Description */}
                <Form.Group className='my-2' controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                {/* Date */}
                <Form.Group className='my-2' controlId='date'>
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type='date'
                        placeholder='Enter date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                {/* Time */}
                <Form.Group className='my-2' controlId='time'>
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                        type='time'
                        placeholder='Enter time'
                        value={time}
                        onChange={(e) => setTime(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                {/* Location */}
                <Form.Group className='my-2' controlId='location'>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter location'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                {isLoading && <Loader />}

                {/* Button */}
                <Button type='submit' variant='primary' className='mt-3'>
                    Update Event
                </Button>

            </Form>
        </FormContainer>
    )
}

export default CreateEventScreen;
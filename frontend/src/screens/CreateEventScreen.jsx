import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

import { useCreateEventMutation } from '../slices/eventsApiSlice';

const CreateEventScreen = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');

    // const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { userInfo } = useSelector((state) => state.auth);

    const [createEvent, { isLoading }] = useCreateEventMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await createEvent({ name, description, date, time, location }).unwrap();            
            toast.success('Event created successfully!');
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
                    Create Event
                </Button>

            </Form>
        </FormContainer>
    )
}

export default CreateEventScreen;
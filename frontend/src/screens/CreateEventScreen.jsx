import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

import { useCreateEventMutation } from '../slices/eventsApiSlice';
import { getCurrentDate } from '../utils/checkDate';

const CreateEventScreen = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState('');

    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const [createEvent, { isLoading }] = useCreateEventMutation();

    const resetForm = () => {
        setName('');
        setDescription('');
        setDate('');
        setTime('');
        setDuration('');
        setLocation('');
        setCapacity('');
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await createEvent({ name, description, date, time, duration, location, capacity }).unwrap();
            toast.success('Event created successfully!');
            navigate('/');
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
                        type='date' min={getCurrentDate()}
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

                {/* Duration */}
                <Form.Group className='my-2' controlId='duration'>
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                        type='number' min='0'
                        placeholder='Enter duration in minutes'
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}>
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

                {/* Capacity */}
                <Form.Group className='my-2' controlId='capacity'>
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control
                        type='number' min='0'
                        placeholder='Enter capacity'
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                {isLoading && <Loader />}

                {/* Button */}
                <div className='lineBtns'>
                    <Button type='submit' variant='primary' className='modify mt-3'>
                        Create Event
                    </Button>

                    <Button type='reset' variant='secondary' className='delete mt-3' onClick={resetForm}>
                        Reset
                    </Button>
                </div>

            </Form>
        </FormContainer>
    )
}

export default CreateEventScreen;
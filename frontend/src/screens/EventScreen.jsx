import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import EventContainer from '../components/EventContainer';
import { useGetEventsMutation } from '../slices/eventsApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import '../index.css'
import { FaSlidersH } from 'react-icons/fa';
import { MdDateRange, MdDelete } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import { HiLocationMarker } from "react-icons/hi";


const EventScreen = () => {
    const [name, setName] = useState('');
    const [events, setEvents] = useState([]);

    const navigate = useNavigate();

    const [getEvents, { isLoading }] = useGetEventsMutation();

    const { userInfo } = useSelector((state) => state.auth);


    useEffect(() => {
        setName(userInfo.name);
        // 
        fetchEvents();
    }, [userInfo.setName]);

    const fetchEvents = async () => {
        try {
            const res = await getEvents().unwrap();
            setEvents(res);
        } catch (err) {
            console.log(err);
        }
    }

    const handleModifyBtn = (item) => {
        console.log(item);
        navigate('/update', {
            state: item 
        });
    }

    return (
        <div>
            <Container className='d-flex justify-content-center'>
                <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
                    <h1 className='text-center'>{name}, welcome to the Event Manager</h1>
                    <p className='text-center'>This is a simple app to manage events</p>
                    <Button className='btn btn-primary btn-lg' href='/create'>Add event</Button>
                </Card>
            </Container>

            <div className='event-grid'>
                {events.map(item => (
                    <EventContainer key={item._id}>
                        <div id='evName'>{item.name}</div>
                        <div id='evDesc'>{item.description}</div>
                        <div id='dateTime'>
                            <div id='evDate'><MdDateRange /> {item.date}</div>
                            <div id='evTime'><IoTime /> {item.time}</div>
                        </div>
                        <div id='evLoc'><HiLocationMarker /> {item.location}</div>

                        <div id='event-control'>
                            <Button className='bt modify' onClick={() => handleModifyBtn(item)}><FaSlidersH /></Button>
                            <Button className='bt cancel'><MdDelete /></Button>
                        </div>

                    </EventContainer>
                ))
                }
            </div>
        </div>
    );
};

export default EventScreen;
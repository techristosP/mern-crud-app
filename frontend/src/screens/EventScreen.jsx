import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import EventContainer from '../components/EventContainer';
import { useGetEventsMutation, useDeleteEventMutation } from '../slices/eventsApiSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import '../index.css'
import { FaSlidersH } from 'react-icons/fa';
import { MdDateRange, MdDelete, MdOutlineReduceCapacity, MdPeopleAlt } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import { HiLocationMarker } from "react-icons/hi";
import { GiDuration } from "react-icons/gi";


const EventScreen = () => {
    const [name, setName] = useState('');
    const [events, setEvents] = useState([]);

    const navigate = useNavigate();

    const [getEvents, { isLoading }] = useGetEventsMutation();
    const [deleteEvent] = useDeleteEventMutation();

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

    const handleDeleteBtn = async (item) => {
        try {
            const res = await deleteEvent(item).unwrap();
            toast.success('Event deleted successfully!');
            fetchEvents();
        }
        catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    return (
        <div>
            <Container className='d-flex justify-content-center'>
                <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
                    <h1 className='text-center'>{name}, welcome to VIP Events!</h1>
                    <p className='text-center'>This is a simple app to manage events</p>
                    <Button className='btn btn-primary btn-lg modify' href='/create'>Add event</Button>
                </Card>
            </Container>

            <div className='event-grid'>
                {events.map(item => (
                    <EventContainer key={item._id}>
                        <div id='evName-evBtns'>
                            <div id='evName'>{item.name}</div>
                            <div id='evBtns'>
                                <Button className='bt modify' onClick={() => handleModifyBtn(item)}><FaSlidersH /></Button>
                                <Button className='bt delete' onClick={() => handleDeleteBtn(item)}><MdDelete /></Button>
                            </div>
                        </div>
                        <div id='evDesc'>{item.description}</div>
                        <div id='dateTime'>
                            <div id='evDate'><MdDateRange /> {item.date}</div>
                            <div id='evTime'><IoTime /> {item.time}</div>
                        </div>
                        <div id='evLoc'><HiLocationMarker /> {item.location}</div>
                        <div><GiDuration /> {item.duration} minutes</div>
                        <div><MdOutlineReduceCapacity /> {item.capacity} capacity</div>
                        <div><MdPeopleAlt /> {item.attendants} attendants</div>


                    </EventContainer>
                ))
                }

                {isLoading && <Loader />}
            </div>
        </div>
    );
};

export default EventScreen;


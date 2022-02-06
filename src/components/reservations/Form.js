import { useEffect, React, useState } from "react";
import { useNavigate, Link, useLocation, useParams } from 'react-router-dom';

import { Form, Button, Alert } from 'react-bootstrap';
import * as api from '../../api.js';
import Cookies from 'universal-cookie';


/* Home page content */
function ReservationForm(props) {
    const [error, setError] = useState("");
    const [user, setUser] = useState("");
    const [guestEmail, setGuestEmail] = useState("");
    const [roomTypeId, setRoomTypeId] = useState("");
    const [checkInDate, setCheckInDate] = useState("");
    const [numberOfNights, setNumberOfNights] = useState("");

    let navigate = useNavigate();
    const location = useLocation();
    const cookies = new Cookies();

    //check for id param in url, if one present then show edit form 
    let { reservationId } = useParams();
    
        const loadReservation = async () => {
            const cookies = new Cookies();
            const data =  await api.get(
                `/reservations/`+reservationId,
                cookies.get('session').token
            );
            console.log(data);
            setUser(data.user);
            setGuestEmail(data.guestEmail);
            setRoomTypeId(data.roomTypeId);
            setCheckInDate(data.checkInDate);
            setNumberOfNights(data.numberOfNights);
        }

    //usesEffect to run code only once on initial render
    useEffect(() => {
        if(reservationId) loadReservation();
    }, [reservationId]);


    /* Handle login form submission */
    const handleSubmit = async (event) => {
        event.preventDefault();
		
        if(reservationId) var method = 'put';
            else var method = 'post';

        const response = await api[method](`/reservations/`+(reservationId ? reservationId : ''), { id: reservationId, user, guestEmail, roomTypeId, checkInDate, numberOfNights}, cookies.get('session').token);
        console.log(response);
        
        if(response.error) {
            setError(response.error);
            return false;
        }

        if(response.id) {
            navigate(`/reservation/`+response.id); 
        } else {
            setError("Uknown error");
        }
    }

    return <div>
        {error != "" && 
            <Alert variant="danger" onClose={() => setError(false)} dismissible>
                <Alert.Heading>Error</Alert.Heading>
                <p>
                {error}
                </p>
            </Alert> 
        }
        <h1>{reservationId ? 'Edit Reservation' : 'Create Reservation'}</h1>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="user">
            <Form.Label>User</Form.Label>
            <Form.Control type="text" placeholder="User" value={user} onChange={(e) => setUser(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
            <Form.Label>Guest Email</Form.Label>
            <Form.Control type="text" placeholder="Guest email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="rate">
            <Form.Label>roomTypeId</Form.Label>
            <Form.Control type="text" placeholder="roomTypeId" value={roomTypeId} onChange={(e) => setRoomTypeId(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="rate">
            <Form.Label>Check in Date</Form.Label>
            <Form.Control type="text" placeholder="Check in date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="rate">
            <Form.Label>Number of nights</Form.Label>
            <Form.Control type="text" placeholder="Enter number of nights" value={numberOfNights} onChange={(e) => setNumberOfNights(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
    </div>;
}

export default ReservationForm;

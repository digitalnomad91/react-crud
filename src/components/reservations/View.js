import { useEffect, React, useState } from "react";
import {  useParams, Link  } from "react-router-dom";
import data from "../../items.json";
import * as api from '../../api.js';
import Cookies from 'universal-cookie';
import { Table } from 'react-bootstrap';


/* Stuff page content */
function Reservation() {
    const [reservation, setReservation] = useState([]);
    /* grab data from items.json and parse out the right one using stuffId from the url path */
    let { reservationId } = useParams();

    const loadReservation = async () => {
        const cookies = new Cookies();
        const data =  await api.get(
            `/reservations/`+reservationId,
            cookies.get('session').token
        );
        setReservation(data);
    }

    //usesEffect to run code only once on initial render
    useEffect(() => {
        loadReservation();
    }, []);

    return <div>
        <h1>View Reservation</h1>
        <Table striped bordered hover>
            <tbody>
            <tr>
        <td>{reservation.id}</td>
                    <td>{reservation.user}</td>
                    <td>{reservation.guestEmail}</td>
                    <td>{reservation.roomTypeId}</td>
                    <td>{reservation.checkInDate}</td>
                    <td>{reservation.numberOfNights}</td>
                    <td><Link key={reservation.id} className="nav-link" to={'/reservation/edit/'+reservation.id}>Edit</Link></td>
                    </tr>
                    </tbody>
</Table>

    </div>;
}

export default Reservation;
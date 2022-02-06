import { useEffect, React, useState } from "react";
import { Link } from 'react-router-dom';
import * as api from '../../api.js';
import Cookies from 'universal-cookie';
import { Table } from 'react-bootstrap';


/* Stuff page content */
function Reservations() {
    const [reservations, setReservations] = useState([]);

    const loadReservations = async () => {
        const cookies = new Cookies();
        const data =  await api.get(
            `/reservations`,
            cookies.get('session').token
        );
        console.log(data);
        setReservations(data);
    }

    //usesEffect to run code only once on initial render
    useEffect(() => {
        loadReservations();
    }, []);

    return <div>
        <h1>Reservations</h1>
        <Link  className="btn btn-primary" to={'/reservation/create'}>Create</Link>
        
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>#</th>
            <th>User</th>
            <th>Guest Email</th>
            <th>room Type Id</th>
            <th>Check in Date</th>
            <th>No. Nights</th>
            <th>Edit</th>
            </tr>
        </thead>
        <tbody>

            {
                /* Grab data from items.json file & then display all items using map (and generate a link for each one) */
                reservations && reservations.length>0 && reservations.map((item)=>
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                    <Link key={item.id} className="nav-link" to={'/reservation/'+item.id}>{item.user}</Link>
                    </td>
                    <td>{item.guestEmail}</td>
                    <td>{item.roomTypeId}</td>
                    <td>{item.checkInDate}</td>
                    <td>{item.numberOfNights}</td>
                    <td>
                    <Link key={item.id} className="nav-link" to={'/reservation/edit/'+item.id}>Edit</Link>
                    </td>
                </tr>
                )
            }
        </tbody>
        </Table>


    </div>;
}

export default Reservations;
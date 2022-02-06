import { useEffect, React, useState } from "react";
import { Link } from 'react-router-dom';
import * as api from '../../api.js';
import Cookies from 'universal-cookie';
import { Table } from 'react-bootstrap';


/* Stuff page content */
function RoomTypes() {
    const [roomTypes, setRoomTypes] = useState([]);

    const loadRoomTypes = async () => {
        const cookies = new Cookies();
        const data =  await api.get(
            `/room-types`,
            cookies.get('session').token
        );
        console.log(data);
        setRoomTypes(data);
    }

    //usesEffect to run code only once on initial render
    useEffect(() => {
        loadRoomTypes();
    }, []);

    return <div>
        <h1>Room Types</h1>
        <Link  className="btn btn-primary" to={'/room-type/create'}>Create</Link>

        <Table striped bordered hover>
        <thead>
            <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Rate</th>
            <th>Active</th>
            <th>Edit</th>
            </tr>
        </thead>
        <tbody>

            {
                /* Grab data from items.json file & then display all items using map (and generate a link for each one) */
                roomTypes && roomTypes.length>0 && roomTypes.map((item)=>
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                    <Link key={item.id} className="nav-link" to={'/room-type/'+item.id}>{item.name}</Link>
                    </td>
                    <td>{item.description}</td>
                    <td>{item.rate}</td>
                    <td>{item.active ? 'true' : 'false'}</td>
                    <td><Link className="nav-link" to={'/room-type/edit/'+item.id}>Edit</Link></td>
                </tr>
                )
            }
        </tbody>
        </Table>


    </div>;
}

export default RoomTypes;
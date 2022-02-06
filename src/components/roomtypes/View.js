import { useEffect, React, useState } from "react";
import {  useParams  } from "react-router-dom";
import data from "../../items.json";
import * as api from '../../api.js';
import Cookies from 'universal-cookie';
import { Table } from 'react-bootstrap';


/* Stuff page content */
function RoomType() {
    const [article, setArticle] = useState([]);
    /* grab data from items.json and parse out the right one using stuffId from the url path */
    let { stuffId } = useParams();


    const loadArticles = async () => {
        const cookies = new Cookies();
        const data =  await api.get(
            `/room-types/1`,
            cookies.get('session').token
        );
        setArticle(data);
    }

    //usesEffect to run code only once on initial render
    useEffect(() => {
        loadArticles();
    }, []);

    return <div>
        <h1>View Room</h1>
        <Table striped bordered hover>
            <tbody>
            <tr>
        <td>{article.id}</td>
                    <td>{article.name}</td>
                    <td>{article.description}</td>
                    <td>{article.rate}</td>
                    <td>{article.active ? 'true' : 'false'}</td>
                    <td><a href="#">Edit</a></td>
                    </tr>
                    </tbody>
</Table>

    </div>;
}

export default RoomType;
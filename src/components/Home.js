import { useEffect, React, useState } from "react";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import * as api from '../api.js';
import Cookies from 'universal-cookie';


/* Home page content */
function Home(props) {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();
    const location = useLocation();
    const cookies = new Cookies();

    /* If user is already logged in then redirect from home page / login form to /stuff */
    useEffect(() => {
        if(cookies.get('session').username) {
            navigate('/stuff')
        }
    }, [props])
    

    /* Handle login form submission */
    const handleSubmit = async (event) => {
        event.preventDefault();
		const response = await api.post(`/login`, { email, password });
        if(response.error) {
            setError(response.error);
            return false;
        }

        if(response.token) {
            cookies.set('session', {username: email, token: response.token}, { path: '/' });
            props.setUser({
                id: 1,
                username: email
              })

            navigate(`/stuff`); 
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

        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
    </div>;
}

export default Home;
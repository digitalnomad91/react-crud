import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';


function NavigationBar(props) {

    let navigate = useNavigate();
    const location = useLocation();
    const cookies = new Cookies();


      /* Logout link callback function (just sets user state to blank object) */
      const logoutCallback = () => {
        if (window.confirm("Are you sure?") == true) {
          cookies.set('session', '', { path: '/' });
          props.setUser({})
        } 

        //redirect to / home page using react-dom SPA
        navigate(`/`); 
      }  

    //hardcoded inline display style for styling nav links properly
    const divStyle = {
        display: 'inline',
      };

    //Check if user.id is set, and then display the proper navbar links based on login state
    let loggedinLinks, username;
    if (typeof(props.user.id) === "undefined") {      
        loggedinLinks = <div style={divStyle}><Nav.Link style={divStyle} href="/">Login</Nav.Link></div>;
    } else {      
        loggedinLinks = <div style={divStyle}>
                        <Link style={divStyle} className={location.pathname === '/reservations' ? 'nav-link fw-bold' : 'nav-link'} to="/reservations">Reservations</Link>
                        <Link style={divStyle} className={location.pathname.includes("/room-types") ? 'nav-link fw-bold' : 'nav-link'} to="/room-types">Room-Types</Link>
                        <Nav.Link style={divStyle} href="#" onClick={e => logoutCallback()}>Logout</Nav.Link>
                    </div>;
        username = <span style={divStyle}>({props.user.username})</span>;    
    }

    //bootstrap navbar component & our react-dom links
    return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>Hotel Bookings</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                {loggedinLinks} {username}
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
);
}
export default NavigationBar;
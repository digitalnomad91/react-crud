import react, { useEffect, useState, useCallback } from 'react';
import Home from './components/Home';

import RoomTypes from './components/roomtypes/Index';
import RoomType from './components/roomtypes/View';
import Reservations from './components/reservations/Index';
import Reservation from './components/reservations/View';
import ReservationForm from './components/reservations/Form';
import NavigationBar from './components/NavigationBar';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Cookies from 'universal-cookie';


/* 404 page not found */
function NotFound() {
  return (
    <div>Not Found</div>
  );
}

function App() {

  /* Create user state variable for logged in / out state */
  const [user, setUser] = react.useState({});
  
  useEffect(() => {
    const cookies = new Cookies();

    /* Check if we have a login session cookie */
    const loginCookie = cookies.get('session')
    if(typeof(loginCookie.username) != "undefined") {
      setUser({
        id: 1,
        username: loginCookie.username
      })
    }
  }, []);



  return (
      <div className="App">
        <BrowserRouter>
          <NavigationBar setUser={setUser} user={user}></NavigationBar>
          <Container className="pt-4">
            <Routes>
              <Route path="/" element={<Home setUser={setUser} user={user} />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/room-types" element={<RoomTypes />} />
              <Route
                path="room-type/:roomTypeId"
                element={<RoomType />}
              />
              <Route
                path="reservation/:reservationId"
                element={<Reservation />}
              />
              <Route
                path="reservation/create"
                element={<ReservationForm />}
              />
              <Route
                path="reservation/edit/:reservationId"
                element={<ReservationForm />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Container>
          </BrowserRouter>
      </div>
  );
}

export default App;
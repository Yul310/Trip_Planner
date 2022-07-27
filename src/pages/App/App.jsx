
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from "../../components/NavBar/NavBar";
import { useState, useEffect, useRef } from "react";
import { Routes,Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import NewDestinationPage from "../NewDestinationPage/NewDestinationPage";
import NewTripPage from "../NewTripPage/NewTripPage";
import TripIndexPage from "../TripIndexPage/TripIndexPage";

import * as tripAPI from "../../utilities/trips-api";


export default function App() {
 
  const [user, setUser] = useState(getUser());
  const [allTrips, setAllTrips] = useState([]);
  const [updated, setUpdated] = useState(false);



/////////////////   
// Get All Trips
/////////////////
   useEffect(
    function () {
      async function getCats() {
        const trips = await tripAPI.getAll();
        setAllTrips(trips);
          console.log(trips);
      }
      getCats();
    },
    []
  );





  return (
    <main className="App">
       { user ?
      <div>
       <NavBar
       user={user}
      />
      <Routes>
        <Route path="/trips/new" element={<NewTripPage setUpdated={setUpdated} />} />
        <Route path="/trips/destination" element={<NewDestinationPage />} />
        <Route path="/trips" element={<TripIndexPage allTrips={allTrips}/>} />
      </Routes>
      </div>
      :
      <AuthPage setUser={setUser} />
    }
    </main>
  );
}



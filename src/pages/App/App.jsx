
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from "../../components/NavBar/NavBar";
import { useState, useEffect, useRef } from "react";
import { Routes,Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import NewPlacePage from "../NewPlacePage/NewPlacePage";
import NewTripPage from "../NewTripPage/NewTripPage";
import TripIndexPage from "../TripIndexPage/TripIndexPage";

import * as tripAPI from "../../utilities/trips-api";

import * as placeAPI from "../../utilities/places-api";


export default function App() {
 
  const [user, setUser] = useState(getUser());
  const [allTrips, setAllTrips] = useState([]);
  const [allPlaces, setAllPlaces] = useState([]);
  const [updated, setUpdated] = useState(false);



/////////////////   
// Get All Trips
/////////////////
   useEffect(
    function () {
      async function getTrips() {
        const trips = await tripAPI.getAll();
        setAllTrips(trips);
          console.log(trips);
      }
      getTrips();
    },
    [updated]
  );


/////////////////   
// Get All Trips
/////////////////
useEffect(
  function () {
    async function getPlaces() {
      const places = await placeAPI.getAll();
      setAllPlaces(places);
        console.log(places);
    }
    getPlaces();
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
        <Route path="/trips/new" element={<NewTripPage setUpdated={setUpdated} allPlaces={allPlaces}/>} />
        <Route path="/trips/places" element={<NewPlacePage setUpdated={setUpdated} allPlaces={allPlaces} setAllPlaces={setAllPlaces}/>} />
        <Route path="/trips" element={<TripIndexPage allTrips={allTrips}/>} />
      </Routes>
      </div>
      :
      <AuthPage setUser={setUser} />
    }
    </main>
  );
}



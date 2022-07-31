
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from "../../components/NavBar/NavBar";
import { useState, useEffect, useRef } from "react";
import { Routes,Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import NewPlacePage from "../NewPlacePage/NewPlacePage";
import NewTripPage from "../NewTripPage/NewTripPage";
import TripIndexPage from "../TripIndexPage/TripIndexPage";
import PlaceEditPage from "../PlaceEditPage/PlaceEditPage";
import TripShowPage from "../TripShowPage/TripShowPage";

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
  [updated]
);





  return (
    <main className="App">
       { user ?
      <div>
       <NavBar
       user={user}
      />
      <Routes>
        
        <Route path="/trips/new" element={<NewTripPage updated={updated}setUpdated={setUpdated} allPlaces={allPlaces}/>} />

        {/* <Route path="/trips/places" element={<NewPlacePage updated={updated} setUpdated={setUpdated} allPlaces={allPlaces} setAllPlaces={setAllPlaces}
        allTrips={allTrips}
        setAllTrips={setAllTrips}
        />} /> */}

        <Route path="/trips" element={<TripIndexPage allTrips={allTrips} setAllTrips={setAllTrips}setUpdated={setUpdated} updated={updated} />} />

        <Route path="/trips/editPlace/:id" element={<PlaceEditPage updated={updated} setUpdated={setUpdated} allPlaces={allPlaces} setAllPlaces={setAllPlaces}
        allTrips={allTrips}
        setAllTrips={setAllTrips}/>} />
        
        <Route path="/trips/showTrip/:id" element={<TripShowPage updated={updated} setUpdated={setUpdated} allPlaces={allPlaces} setAllPlaces={setAllPlaces}
        allTrips={allTrips}
        setAllTrips={setAllTrips}/>} />
        
      </Routes>
      </div>
      :
      <AuthPage setUser={setUser} />
    }
    </main>
  );
}




import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from "../../components/NavBar/NavBar";
import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import NewTripPage from "../NewTripPage/NewTripPage";
import TripIndexPage from "../TripIndexPage/TripIndexPage";
import PlaceEditPage from "../PlaceEditPage/PlaceEditPage";
import TripShowPage from "../TripShowPage/TripShowPage";
import HomePage from "../HomePage/HomePage";

import * as tripAPI from "../../utilities/trips-api";

import * as placeAPI from "../../utilities/places-api";



export default function App() {

  const [user, setUser] = useState(getUser());
  const [allTrips, setAllTrips] = useState([]);
  const [allPlaces, setAllPlaces] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [unique, setUnique] = useState(false);



  /////////////////   
  // Get All Trips
  /////////////////
  useEffect(
    function () {
      async function getTrips() {
        const trips = await tripAPI.getAll();
        setAllTrips(trips);
        console.log("app trip update", trips);
      }
      getTrips();
    },
    [updated]
  );


  ///////////////   
  // Get All Trips
  ///////////////
  useEffect(
    function () {
      async function getPlaces() {
        const places = await placeAPI.getAll();
        setAllPlaces(places);
        console.log("app place update", places);
      }
      getPlaces();
    },
    [updated]
  );







  return (
    <main className="App">
      {user ?
        <div>
          <NavBar
            user={user}
            setUser={setUser}
          />
          <Routes>



            <Route path="/" element={<HomePage allTrips={allTrips} setAllTrips={setAllTrips} setUpdated={setUpdated} updated={updated} user={user} />} />


            <Route path="/trips/new" element={<NewTripPage updated={updated} setUpdated={setUpdated} allPlaces={allPlaces} />} />

            <Route path="/trips" element={<TripIndexPage allTrips={allTrips} setAllTrips={setAllTrips} setUpdated={setUpdated} updated={updated} user={user} />} />

            <Route path="/trips/showTrip/:id" element={<TripShowPage updated={updated} setUpdated={setUpdated} allPlaces={allPlaces} setAllPlaces={setAllPlaces}
              allTrips={allTrips}
              setAllTrips={setAllTrips} />} />

            <Route path="/trips/editPlace/:id" element={<PlaceEditPage updated={updated} setUpdated={setUpdated} allPlaces={allPlaces} setAllPlaces={setAllPlaces}
              allTrips={allTrips}
              setAllTrips={setAllTrips} />} />



          </Routes>
        </div>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}



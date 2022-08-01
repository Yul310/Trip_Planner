
import { useState, useCallback, useEffect, useRef } from 'react'
import { GoogleMap, useJsApiLoader, useLoadScript, MarkerF, Autocomplete, DirectionsRenderer, InfoWindow, Marker, MarkerClusterer } from '@react-google-maps/api';
import "./Map.css"
import MapStyles from './MapStyles'
import * as placeAPI from "../../utilities/places-api";

// import * as destinationAPI from "../../utilities/destinations-api";


const containerStyle = {
  width: '100vw',
  height: '50vh',
  margin: '0 auto',
}
const google = window.google


export default function Map({ allPlaces, updated, setUpdated, distance, setDistance, duration, setDuration, allTrips, theTrip, thePlaces, setAllTrips, setAllPlaces }) {

  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [newPlace, setNewPlace] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    tripId: "",
    staying: "",
    note: "",
  });
  const [currentLocation, setCurrentLocation] = useState({
    lat: 48.8584,
    lng: 2.2945
  })

  // const onLoad = useCallback((map) =>(mapRef.current = map), []);
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  const API_KEY = process.env.REACT_APP_MAPS_API_KEY



  const { isLoaded } = useLoadScript({

    googleMapsApiKey: API_KEY,
    libraries: ['places'],

  })
  if (!isLoaded) return <div>Loading...</div>;



  //////////////////////////////////////
  /////  Google API Functions    ///////
  //////////////////////////////////////

  function handleChange() {
    console.log(originRef.current.value)
    console.log(theTrip._id)

    setFormData({ name: "", tripId: theTrip._id, staying: "", note: "" });
    // setFormData({  note: Autocomplete.getPlace() });
    console.log(formData);

  }


  async function findPlace() {

    const directionsService = new window.google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: originRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    })
    console.log(results.request.origin.query)
    const theData = { name: results.request.origin.query, tripId: theTrip._id, staying: "", note: "" }
    // setFormData({ ...formData, name: results.request.origin.query })
    console.log(theData)

    setUpdated(!updated)
    // setAllPlaces(formData)
 
    placeAPI.newPlace(theData)
    setUpdated(!updated)
    console.log("updated?really?")

    originRef.current.value = ''


  }





  async function calculateAllRoute() {


    console.log(thePlaces)
    setDistance('')
    setDuration('')

    for (let i = 0; i < thePlaces.length - 1; i++) {
      const directionsService = new window.google.maps.DirectionsService()
      const results = await directionsService.route({

        origin: thePlaces[i].name,

        destination: thePlaces[i + 1].name,

        travelMode: window.google.maps.TravelMode.DRIVING,

      })

      setDirectionsResponse(results)
      setDistance(distance => [...distance, results.routes[0].legs[0].distance.text])
      setDuration(duration => [...duration, results.routes[0].legs[0].duration.text])

      console.log(distance)
      console.log(duration)


    }

  }




  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''

  }


  //////////////////////////////////////
  /////  Handle the click evens ///////
  //////////////////////////////////////

  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log(formData);
    findPlace()
  }

  // function handleChange(evt) {
  //   console.log(originRef.current.value)

  //   setFormData({ ...formData, [evt.target.name]: evt.target.value, name: originRef.current.value });
  //   // setFormData({  note: Autocomplete.getPlace() });
  //   console.log(formData);

  // }




  return (

    <>
      {/* items-center justify-evenly */}
      <div className=" grid grid-cols-6 m-3">
        <Autocomplete className=" col-start-3 col-end-5" >
          <input type="text" placeholder='Search place here' ref={originRef} className="w-60 h-8" name="name" />
        </Autocomplete>


        {/* <label className="font-light text-left text-lg h-1/2 px-2 py-2">
          Trip Name
        </label>

        <select
          name="tripId"
          value={formData.tripId}
          onChange={handleChange}
          className="font-extralight text-2l text-left h-1/2 px-2 py-2 bg-[#f7f7f2]"
        >
          <option >Select a trip</option>
          {allTrips.map((trip) => (
            <option value={trip._id} key={trip._id}>
              {trip.title}
            </option>
          ))}


        </select> */}




        <div className=" col-start-5" >

          <button type="submit" onClick={findPlace} className="w-36 h-8 bg-[#AAEFDF] text-[#4C5454] "  >Add To Trip</button>

        </div>
        {/* <Autocomplete className="m-0 p-0">
          <input type="text" placeholder='Destination' ref={destiantionRef} className="w-60 h-8" onChange={handleChange} name="destination" value={formData.destination} />
        </Autocomplete> */}

        <div className=" col-start-6" >
          <button type="submit" onClick={calculateAllRoute} className="w-36 h-8 bg-[#AAEFDF] col-start-6 text-[#4C5454]" >ShowRoute</button>
        </div>
      </div>



      < GoogleMap
        center={currentLocation}
        zoom={15}
        mapContainerStyle={containerStyle}
        options={{
          styles: MapStyles,
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >

        <MarkerF
          position={currentLocation}
        />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}

      </GoogleMap>



    </>

  )
}

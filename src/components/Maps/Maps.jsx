
import { useState, useCallback, useEffect, useRef } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import "./Map.css"
import MapStyles from './MapStyles'
import * as destinationAPI from "../../utilities/destinations-api";


const containerStyle = {
  width: '70vw',
  height: '50vh',
  margin: '0 auto',
}
const google = window.google

const center = { lat: 48.8584, lng: 2.2945 }


export default function Maps() {

  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const userMarker = "./images/abc.png"
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    distance: "",
    time: "",

  });

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  const API_KEY = process.env.REACT_APP_MAPS_API_KEY
  // console.log(API_KEY);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries: ['places'],

  })
  // const {isLoaded} = useLoadScript({
  //   googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  // })

  if (!isLoaded) return <div>Loading...</div>;



  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }

    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,

      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
    console.log(typeof distance)
    console.log(typeof duration)
    setFormData({ ...formData, time: duration, distance: distance });
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }


  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log(formData);
    calculateRoute()
    
    destinationAPI.newDestination(formData);
    setFormData({
      origin: "",
      destination: "",
      time: "",
      distance: "",
    });
  }

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    console.log(formData);
  }


  return (



    <>
      <div className=" flex flex-row items-center justify-evenly">
        <Autocomplete className="m-0 p-0">
          <input type="text" placeholder='Origin' ref={originRef} className="w-60 h-8" onChange={handleChange} name="origin" value={formData.origin} />
        </Autocomplete>
        <Autocomplete className="m-0 p-0">
          <input type="text" placeholder='Destination' ref={destiantionRef} className="w-60 h-8" onChange={handleChange} name="destination" value={formData.destination} />
        </Autocomplete>

        <button type="submit" onClick={handleSubmit} className="w-60 h-8 bg-green-500 m-0 p-0" >ShowRoute</button>

      </div>

      <div className=" flex w-200 h-8 flex-row  justify-evenly ">
        <h3>Distance: {distance} </h3>
        <h3>Duration: {duration} </h3>
      </div>





      < GoogleMap
        center={center}
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
          position={center}
        />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}

      </GoogleMap>

    </>

  )
}


import { useState, useCallback, useEffect, useRef } from 'react'
import { GoogleMap, useJsApiLoader, useLoadScript,MarkerF, Autocomplete, DirectionsRenderer, InfoWindow, Marker,MarkerClusterer } from '@react-google-maps/api';
import "./Map.css"
import MapStyles from './MapStyles'
import * as placeAPI from "../../utilities/places-api";
// import * as destinationAPI from "../../utilities/destinations-api";


const containerStyle = {
  width: '70vw',
  height: '50vh',
  margin: '0 auto',
}
const google = window.google


export default function Map({allPlaces,updated,setUpdated,distance,setDistance, duration, setDuration}) {
  const mapRef = useRef<GoogleMap>(null);
  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  // const [distance, setDistance] = useState([])
  // const [duration, setDuration] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    distance: "",
    time: "",
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



  async function findPlace() {
     console.log(originRef.current.value)
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: originRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setFormData({ ...formData, name: results.request.origin.query })
    console.log(formData)
    // console.log(results.geocoded_waypoints[0].place_id)
    console.log(results.request.origin.query)
    placeAPI.newPlace(formData)
    setUpdated(!updated)
  }



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

    // setFormData({ time: duration, distance: distance });
  }




    async function calculateAllRoute() {
   
    
        console.log(allPlaces)
        setDistance('')
        setDuration('')
        
        for (let i = 0; i < allPlaces.length-1; i++) {
          const directionsService = new window.google.maps.DirectionsService()
            const results = await directionsService.route({
           
                origin: allPlaces[i].name,

                destination: allPlaces[i + 1].name,

                travelMode: google.maps.TravelMode.DRIVING,

            })

            setDirectionsResponse(results)
            setDistance(distance =>[...distance, results.routes[0].legs[0].distance.text])
            setDuration(duration =>[...duration, results.routes[0].legs[0].duration.text])
      
            console.log(distance)
            console.log(duration)
            // setFormData({ time: duration, distance: distance });
        }
        
    }




  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  
//////////////////////////////////////
/////  Handle the click evens ///////
//////////////////////////////////////

  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log(formData);
    findPlace()
  }

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    // setFormData({  note: Autocomplete.getPlace() });
    console.log(formData);

  }


  return (

    <>
      <div className=" flex flex-row items-center justify-evenly">
        <Autocomplete className="m-0 p-0"   >
          <input type="text" placeholder='Search place here' ref={originRef} className="w-60 h-8" name="name"   />
        </Autocomplete>
        <button type="submit" onClick={findPlace} className="w-36 h-8 bg-[#598392] m-0 p-0" >Add To Trip</button>


        {/* <Autocomplete className="m-0 p-0">
          <input type="text" placeholder='Destination' ref={destiantionRef} className="w-60 h-8" onChange={handleChange} name="destination" value={formData.destination} />
        </Autocomplete> */}


        <button type="submit" onClick={calculateAllRoute} className="w-36 h-8 bg-[#598392] m-0 p-0" >ShowRoute</button>

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

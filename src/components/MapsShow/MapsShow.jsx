
import { useState, useCallback, useEffect, useRef } from 'react'
import { GoogleMap, useJsApiLoader, useLoadScript, MarkerF, Autocomplete, DirectionsRenderer, InfoWindow, Marker, MarkerClusterer } from '@react-google-maps/api';
import "./Map.css"
import MapStyles from './MapStyles'
import * as placeAPI from "../../utilities/places-api";
import * as tripAPI from "../../utilities/trips-api";
// import * as destinationAPI from "../../utilities/destinations-api";


const containerStyle = {
  width: '100vw',
  height: '50vh',
  margin: '0 auto',
}
const google = window.google


export default function Map({ allPlaces, updated, setUpdated, distance, setDistance, duration, setDuration, allTrips, theTrip, thePlaces, updateMap, setUpdateMap, setAllTrips }) {

  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [newPlace, setNewPlace] = useState([])
  const [eTrip, setETrip] = useState([])






  useEffect(() => {
    if (theTrip) {
      setETrip(theTrip)
    }
  }, [])


  const [formData, setFormData] = useState({
    name: "",
    tripId: "",
    staying: "",
    note: "",
  });
  const [currentLocation, setCurrentLocation] = useState({
    lat: 33.8885,
    lng: -117.8133
  })
  const [tripMode, setTripMode] = useState("DRIVING")

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

  //

  //////////////////////////////////////
  /////  Google API Functions    ///////
  //////////////////////////////////////


  async function findPlace() {
    setUpdated(!updated)
    const directionsService = new window.google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: originRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    })
    // console.log(results.request.origin.query)
    const theData = { name: results.request.origin.query, tripId: theTrip._id, staying: "", note: "" }
    // console.log(theData)
    placeAPI.newPlace(theData)
    setUpdated(!updated)
    originRef.current.value = ''
    setTimeout(() => {
      bugFix()
    }, 1000)
  }

  function bugFix() {
    findPlace()
  }





  async function calculateAllRoute() {
    // console.log(thePlaces)
    setDistance('')
    setDuration('')

    for (let i = 0; i < thePlaces.length - 1; i++) {
      const directionsService = new window.google.maps.DirectionsService()
      const results = await directionsService.route({

        origin: thePlaces[i].name,

        destination: thePlaces[i + 1].name,

        travelMode: window.google.maps.TravelMode[tripMode]

      })

      setDirectionsResponse(results)
      setDistance(distance => [...distance, results.routes[0].legs[0].distance.text])
      setDuration(duration => [...duration, results.routes[0].legs[0].duration.text])

      console.log(distance)
      console.log(duration)
    }
  }


  function tripModeChange(e) {

    setTripMode(e.target.value)

    console.log(e.target.value)
    console.log(tripMode)
    e.target.value = ""
  }





  return (

    <>
      {/* items-center justify-evenly */}
      <div className=" grid grid-cols-6 m-3 col-start-1 col-end-2">


        {theTrip &&
          <div className="flex flex-row" >
            <h3 id="subtitle" className="font-bold text-xl text-black mt-2 ml-5 drop-shadow-[0_1px_1px_white]"  >{theTrip.title}  </h3>
            <h3 className="font-bold text-xl text-[black mt-2 ml-5 drop-shadow-[0_1px_1px_white]">{`${theTrip.date}`.split('T')[0]}</h3>
          </div>
        }
        {theTrip == null &&
          <div className="flex flex-row" >
            <h3 id="subtitle" className="font-bold text-xl text-black mt-2 ml-5 drop-shadow-[0_1px_1px_white]"  >{eTrip.title}  </h3>
            <h3 className="font-bold text-xl text-[black mt-2 ml-5 drop-shadow-[0_1px_1px_white]">{`${eTrip.date}`.split('T')[0]}</h3>
          </div>}


        <select
          name="tripId"
          value={tripMode}
          onChange={tripModeChange}
          // defaultValue = "DRIVING"
          className="w-60 h-8 border-[2px] border-black rounded-md col-start-2 col-end-3"

        >
          <option >Select a trip mode</option>

          <option value="WALKING" >
            WALKING
          </option>
          <option value="DRIVING" >
            DRIVING
          </option>

        </select>




        <Autocomplete className=" col-start-3 col-end-5" >
          <input type="text" placeholder='Search place here' ref={originRef} className="w-60 h-8 border-[2px] rounded-md" name="name" />
        </Autocomplete>








        <div className=" col-start-5" >

          <button type="submit" onClick={findPlace} className="w-36 h-8 bg-[#AAEFDF] text-black border-[2px] "  >Add Destination</button>

        </div>
        {/* <Autocomplete className="m-0 p-0">
          <input type="text" placeholder='Destination' ref={destiantionRef} className="w-60 h-8" onChange={handleChange} name="destination" value={formData.destination} />
        </Autocomplete> */}

        <div className=" col-start-6" >
          <button type="submit" onClick={calculateAllRoute} className="w-36 h-8 bg-[#AAEFDF] col-start-6 text-black border-[2px]" >ShowRoute</button>
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

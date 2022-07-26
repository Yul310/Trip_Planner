
import {useState, useCallback, useEffect,useRef} from 'react'
import { GoogleMap, useJsApiLoader,useLoadScript, MarkerF, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import "./Map.css"
import MapStyles from './MapStyles'


const containerStyle = {
    width: '70vw',
    height: '50vh',
    margin: '0 auto',
  }
const google = window.google

const center = { lat: 48.8584, lng: 2.2945 }


export default function Maps() {

const [map, setMap] = useState(null) 
const [directionsResponse, setDirectionsResponse] = useState(null)
const [distance, setDistance] = useState('')
const [duration, setDuration] = useState('')
const userMarker = "./images/abc.png"

/** @type React.MutableRefObject<HTMLInputElement> */
const originRef = useRef()
/** @type React.MutableRefObject<HTMLInputElement> */
const destiantionRef = useRef()

const API_KEY = process.env.REACT_APP_MAPS_API_KEY
// console.log(API_KEY);
    
const {isLoaded} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    // libraries: ['places'],
    
  })
// const {isLoaded} = useLoadScript({
//   googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
// })

if(!isLoaded) return <div>Loading...</div>;



async function calculateRoute() {
  if (originRef.current.value === '' || destiantionRef.current.value === '') {
    return
  }
  // eslint-disable-next-line no-undef
  const directionsService = new google.maps.DirectionsService()
  const results = await directionsService.route({
    origin: originRef.current.value,
    destination: destiantionRef.current.value,
    // eslint-disable-next-line no-undef
    travelMode: google.maps.TravelMode.DRIVING,
  })
  setDirectionsResponse(results)
  setDistance(results.routes[0].legs[0].distance.text)
  setDuration(results.routes[0].legs[0].duration.text)
}

function clearRoute() {
  setDirectionsResponse(null)
  setDistance('')
  setDuration('')
  originRef.current.value = ''
  destiantionRef.current.value = ''
}




return (

        

           < GoogleMap 
           center = {center} 
           zoom = {15}
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
          //  icon={{
          //   url: userMarker,
          //   scaledSize: new window.google.maps.Size(25, 35)
          // }}
           />
           
           </GoogleMap>
           
      
       
        )
    }
    
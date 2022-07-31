// import MapsShow from '../../components/MapsShow/MapsShow';

import PlaceCardShow from '../../components/PlaceCardShow/PlaceCardShow';
import { useState, useCallback, useEffect, useRef } from 'react'

export default function TripShowPage({updated,setUpdated, allTrips, allPlaces,setAllPlaces,setAllTrips }) 
{
    // const [distance, setDistance] = useState([])
    // const [duration, setDuration] = useState([])
    const [signal, setSignal] = useState(false);


    // console.log(allTrips)
    return (

        <div>
       
        {/* <MapsShow allPlaces={allPlaces} setUpdated={setUpdated} updated={updated} distance={distance} setDistance={setDistance}duration={duration}setDuration={setDuration}
        allTrips={allTrips}
        setAllTrips={setAllTrips}
        
        /> */}

        {/* <h3>New Places</h3> */}
        <div className ="flex flex-row items-center " >
        <PlaceCardShow allPlaces={allPlaces} setUpdated={setUpdated} setAllPlaces={setAllPlaces} 
        allTrips={allTrips} setAllTrips={setAllTrips} setSignal={setSignal} signal={signal}
        />
        </div>
        </div>

        )
    }
    
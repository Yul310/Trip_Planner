// import MapsShow from '../../components/MapsShow/MapsShow';

import PlaceCardShow from '../../components/PlaceCardShow/PlaceCardShow';
import { useState, useCallback, useEffect, useRef } from 'react'

export default function TripShowPage({updated,setUpdated, allTrips, allPlaces,setAllPlaces,setAllTrips }) 
{
    // const [distance, setDistance] = useState([])
    // const [duration, setDuration] = useState([])
 


    // console.log(allTrips)
    return (

        <div>
       
       {/* className ="flex flex-row items-center " */}
        <div  >
        <PlaceCardShow allPlaces={allPlaces} setUpdated={setUpdated} setAllPlaces={setAllPlaces} 
        allTrips={allTrips} setAllTrips={setAllTrips} updated={updated}
        />
        </div>

        </div>

        )
    }
    
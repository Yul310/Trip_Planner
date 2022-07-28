import Maps from '../../components/Maps/Maps';
import PlaceCard from '../../components/PlaceCard/PlaceCard';
import { useState, useCallback, useEffect, useRef } from 'react'

export default function NewDestinationPage({updated,setUpdated, allTrips, allPlaces,setAllPlaces,setAllTrips }) 
{
    const [distance, setDistance] = useState([])
    const [duration, setDuration] = useState([])
    return (

        <div>
       
        <Maps allPlaces={allPlaces} setUpdated={setUpdated} updated={updated} distance={distance} setDistance={setDistance}duration={duration}setDuration={setDuration}
        allTrips={allTrips}
        setAllTrips={setAllTrips}
        
        />

        {/* <h3>New Places</h3> */}
        <div className ="flex flex-row items-center " >
        <PlaceCard allPlaces={allPlaces} setUpdated={setUpdated} setAllPlaces={setAllPlaces} 
        distance={distance} setDistance={setDistance}duration={duration}setDuration={setDuration}/>
        </div>
        </div>

        )
    }
    
import Maps from '../../components/Maps/Maps';
import PlaceCard from '../../components/PlaceCard/PlaceCard';
import { useState, useCallback, useEffect, useRef } from 'react'

export default function NewDestinationPage({updated,setUpdated, allTrips, allPlaces,setAllPlaces }) {
    const [distance, setDistance] = useState([])
    const [duration, setDuration] = useState([])
    return (

        <div>
       
        <Maps allPlaces={allPlaces} setUpdated={setUpdated} updated={updated} distance={distance} setDistance={setDistance}duration={duration}setDuration={setDuration}/>
        <h3>New Places</h3>
        <PlaceCard allPlaces={allPlaces} setUpdated={setUpdated} setAllPlaces={setAllPlaces} 
        distance={distance} setDistance={setDistance}duration={duration}setDuration={setDuration}/>
        </div>

        )
    }
    
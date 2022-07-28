import { useState, useEffect, useRef } from "react";

import { GoogleMap, useJsApiLoader, MarkerF, Autocomplete, DirectionsRenderer, InfoWindow, Marker } from '@react-google-maps/api';

import * as placeAPI from "../../utilities/places-api";

const google = window.google



export default function PlaceCard({ allPlaces, setAllPlaces,distance,duration,setDistance,setDuration }) {
    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const [directionsResponse, setDirectionsResponse] = useState(null)

    const [formData, setFormData] = useState({
        name: "",
        distance: "",
        time: "",
        note: "",
      });


    async function deletePlace(evt) {
        const places = allPlaces.filter((place) => place._id !== evt.target.value);
        console.log(places);
        setAllPlaces(places);
        //sending new data to backend
        await placeAPI.deletePlace(evt.target.value);
    }

    // async function editPlace(evt) {
     
      
    //     const place = allPlaces.filter((place) => place._id === evt.target.value);
        
    //     formData.note = evt.target.value;
     
      
    //     placeAPI.editPlace(evt.target.value, formData);
    
    //     setUpdated(!updated)
        
        
    // }


    

    return (
        <>

            {allPlaces.map((place, idx) => (
                <>
                    

                    <div
                        key={idx}
                        className=" border-black border-[1px] rounded-md pt-2 pb-4 px-4 font-light my-3 w-[13rem] h-98 text-left text-sm bg-[#AEC3B0]"
                        id="hardshadow"
                    >
                       <h3 className="font-bold">{place.name.split(',')[0].toUpperCase()}</h3>
                        <p className="font-light">{place.name.split(',')}</p>
                       



                        <h3 className="font-bold">Note: {place.note}</h3>
                        <input type="text" name="note" className="w-1/10 h-32 text-align:start " value ={formData.note} />
                        <button onClick={deletePlace} value={place._id} className="font-bold text-sm"> Update </button>
                        <p>&nbsp;</p>
                        <button onClick={deletePlace} value={place._id} className="font-bold text-sm"> Delete </button>

                    </div>

                  { distance[idx]?
                    <div className=" flex-column w-80 h-30 ">
                    <h1>{"->"}</h1>
                    <p>&nbsp;</p>
                   
                   <h3 className="font-bold text-sm">{distance[idx]}  </h3>
                    <h3 className="font-bold text-sm"> {duration[idx]}</h3>
                
                    <p>&nbsp;</p>
                    <h1>{"->"}</h1>
                    </div>
                    :null}
                </>
            ))}

         
        </>

    );
}
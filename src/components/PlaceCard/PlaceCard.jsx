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
    //     console.log(evt.target.value);
    //     console.log(allCats)
    //     // FrontEnd updating
      
    //     const cats = allCats.filter((cat) => cat._id === evt.target.value);
        
    //     cats[0].title = formData.title
    //     console.log(cats[0])
    //    console.log(cats[0].title )
    //     //Backend updating
    //     catAPI.editCat(evt.target.value, formData);
    //     setEdit(!edit)
    //     setUpdated(!magic)
        
    //     setFormData({
    //         title: ""
    //     })
        
    // }


    // function clearRoute() {
    //     setDirectionsResponse(null)
    //     setDistance('')
    //     setDuration('')
    //     originRef.current.value = ''
    //     destiantionRef.current.value = ''
    // }

    return (
        <>

            {allPlaces.map((place, idx) => (
                <>
                    

                    <div
                        key={idx}
                        className=" border-black border-[1px] rounded-md pt-2 pb-4 px-4 font-light my-3 w-[20rem] text-left text-sm"
                        id="hardshadow"
                    >
                       <h3 className="font-bold">{place.name.split(',')[0].toUpperCase()}</h3>
                        <h3 className="font-medium">{place.name.split(',').shift()}</h3>
                       



                        <h3 className="font-semibold">Todo: {place.note}</h3>

                        <button onClick={deletePlace} value={place._id}> Delete </button>

                    </div>
                    
                  { distance[idx]?
                    <div className=" flex-column w-80 h-30 ">
                    <h1>||</h1>
                    <p>&nbsp;</p>
                   
                   <h3 className="font-bold">{distance[idx]}  </h3>
                    <h3 className="font-bold"> {duration[idx]}</h3>
                
                    <p>&nbsp;</p>
                    <h1>||</h1>
                    </div>
                    :null}
                </>
            ))}

         
        </>

    );
}
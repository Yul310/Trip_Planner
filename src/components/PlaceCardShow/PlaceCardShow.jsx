import { useState, useEffect, useRef } from "react";
import 'react-edit-text/dist/index.css';
import { Link, useNavigate, useParams, Navigate } from "react-router-dom";
import * as placeAPI from "../../utilities/places-api";





export default function PlaceCardShow({ allPlaces, setAllPlaces, setUpdated, updated, allTrips, setAllTrips }) {

    const [theTrip, setTheTrip] = useState({});
    const [thePlaces, setThePlaces] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        tripId: "",
        staying: "",
        note: "",
    });

   

    const { id } = useParams();
  
        const trip = allTrips.filter((trip) => trip._id === id);
        console.log(trip)
        // setTheTrip(trip[0])
        // console.log(trip[0].place)
        // setThePlaces(trip[0].place)
        // console.log(theTrip)


    async function deletePlace(evt) {
        const places = allPlaces.filter((place) => place._id !== evt.target.value);
        console.log(places);
        setAllPlaces(places);

        await placeAPI.deletePlace(evt.target.value);
        setUpdated(!updated)

    }


    // console.log(allTrips)
  
    useEffect(() => {
      
        setTimeout(() => {
            const trip = allTrips.filter((trip) => trip._id === id);
            console.log(trip[0].place)
            setThePlaces(trip[0].place)
            setTheTrip(trip[0])
      console.log("updating thePlaces",thePlaces)
        },1000)
     } ,[thePlaces, allTrips, id])
    
     useEffect(() => {
      
        setTimeout(() => {
            const trip = allTrips.filter((trip) => trip._id === id);
           
            setTheTrip(trip[0])
      console.log("updating theTrip",theTrip)
        },1000)
     } ,[theTrip, allTrips, id])

      






    function handleChange(evt) {

        const updatedCard = { ...formData, [evt.target.name]: evt.target.value };
        setFormData(updatedCard);

        console.log(formData);
    }



    return (
 
        <>
      
     
            <h3>{theTrip.title}</h3>
            <h3>{`${theTrip.date}`.split('T')[0]}</h3> 

            {thePlaces.map((p) => (

                <div
                    className=" border-black border-[1px] rounded-md pt-2 pb-4 px-4 font-light my-3 w-[13rem] h-98 text-left text-sm bg-[#AEC3B0]"
                    id="hardshadow"
                >
                    <h3>{p.name}</h3>
                    <h3>{p.staying}</h3>
                    <h3>{p.note}</h3>

                </div>

            ))}

             

        </>
    );
}
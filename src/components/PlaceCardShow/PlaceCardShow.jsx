import { useState, useEffect, useRef } from "react";
import 'react-edit-text/dist/index.css';
import { Link, useNavigate, useParams, Navigate } from "react-router-dom";
import * as placeAPI from "../../utilities/places-api";





export default function PlaceCardIndex({ allPlaces, setAllPlaces, setUpdated, updated, allTrips, setAllTrips }) {

    const [theTrip, setTheTrip] = useState();
    const [formData, setFormData] = useState({
        name: "",
        tripId: "",
        staying: "",
        note: "",
    });

console.log(allTrips)

    async function deletePlace(evt) {
        const places = allPlaces.filter((place) => place._id !== evt.target.value);
        console.log(places);
        setAllPlaces(places);

        await placeAPI.deletePlace(evt.target.value);
        setUpdated(!updated)

    }


    const { id } = useParams();

    function placeFinder() {
        console.log(id)
        console.log(allTrips)
        const trip = allTrips.filter((trip) => trip._id === id);
        console.log(allTrips)
        setTheTrip(trip)

    }
    placeFinder();



    function handleChange(evt) {

        const updatedCard = { ...formData, [evt.target.name]: evt.target.value };
        setFormData(updatedCard);

        console.log(formData);
    }



    return (
        <>
            <h3>{theTrip.title}</h3>
            {/* {allPlaces.map((place, idx) => (
                <>


                    <div
                        key={idx}
                        className=" border-black border-[1px] rounded-md pt-2 pb-4 px-4 font-light my-3 w-[13rem] h-98 text-left text-sm bg-[#AEC3B0]"
                        id="hardshadow"
                    >
                        <form action="" onChange={handleChange}>
                            <h3 className="font-bold" value={formData.name}>{place.name.split(',')[0].toUpperCase()}</h3>
                            <p className="font-light">{place.name.split(',')}</p>


                            <h3 className="font-bold">Staying Time: </h3>
                            {place.staying ? <p >{place.staying}</p> : <p className="font-light text-sm"  >No information yet</p>}

                         


                            <h3 className="font-bold">Note: </h3>

                            {place.note ? <p >{place.note}</p> : <p className="font-light text-sm"  >No note yet</p>}


                        </form>
                     

                         <Link to={`/trips/editPlace/${place._id}`} id="linkButton" className="font-bold text-sm "> Edit Page </Link>
                        <p>&nbsp;</p>
                        <button onClick={deletePlace} value={place._id} className="font-bold text-sm"> Delete Place </button>

                    </div>
         
                    {distance[idx] ?
                        <div className=" flex-column w-80 h-30 ">
                            <h1>{"->"}</h1>
                            <p>&nbsp;</p>

                            <h3 className="font-bold text-sm">{distance[idx]}  </h3>
                            <h3 className="font-bold text-sm"> {duration[idx]}</h3>

                            <p>&nbsp;</p>
                            <h1>{"->"}</h1>
                        </div>
                        : null}
                </>
            ))} */}


        </>

    );
}
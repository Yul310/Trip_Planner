import { useState, useEffect, useRef } from "react";
import 'react-edit-text/dist/index.css';
import { Link, useParams } from "react-router-dom";
import * as placeAPI from "../../utilities/places-api";
import MapsShow from '../../components/MapsShow/MapsShow';





export default function PlaceCardShow({ allPlaces, setAllPlaces, setUpdated, updated, allTrips, setAllTrips }) {
    const [distance, setDistance] = useState([])
    const [duration, setDuration] = useState([])
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


    async function deletePlace(evt) {
        const places = allPlaces.filter((place) => place._id !== evt.target.value);
        console.log(places);
        setAllPlaces(places);

        await placeAPI.deletePlace(evt.target.value);
        setUpdated(!updated)

    }




    useEffect(() => {

        setTimeout(() => {
            const trip = allTrips.filter((trip) => trip._id === id);
            console.log(trip[0].place)
            setThePlaces(trip[0].place)
            // setTheTrip(trip[0])
            console.log("updating thePlaces", thePlaces)
        }, 2000)
    }, [thePlaces, allTrips, id, theTrip])

    useEffect(() => {

        setTimeout(() => {
            const trip = allTrips.filter((trip) => trip._id === id);

            setTheTrip(trip[0])
            console.log("updating theTrip", theTrip)
        }, 2000)
    }, [theTrip, allTrips, id, theTrip])









    return (

        <div>
            <MapsShow allPlaces={allPlaces} setUpdated={setUpdated} updated={updated} distance={distance} setDistance={setDistance} duration={duration} setDuration={setDuration}
                allTrips={allTrips}
                setAllTrips={setAllTrips}

            />

            <h3>{theTrip.title}</h3>
            <h3>{`${theTrip.date}`.split('T')[0]}</h3>
<div className="flex flex-row" >
            {thePlaces.map((p) => (

                <div
                
                    className="border-black border-[1px] rounded-md pt-2 pb-4 px-4 font-light my-3 w-[13rem] h-98 text-left text-sm bg-[#AEC3B0]"
                    id="hardshadow"
                >
                    <h3 className="font-bold">{p.name.split(',')[0]}</h3>
                    <h3 className="font-bold">Staying Time: </h3>
                    {p.staying ? <p >{p.staying}</p> : <p className="font-light text-sm"  >No information yet</p>}

                    <h3 className="font-bold">Note: </h3>
                    {p.note ? <p >{p.note}</p> : <p className="font-light text-sm"  >No note yet</p>}

                    <Link to={`/trips/editPlace/${p._id}`} id="linkButton" className="font-bold text-sm "> Edit Page </Link>
                    <p>&nbsp;</p>
                    <button onClick={deletePlace} value={p._id} className="font-bold text-sm"> Delete Place </button>

                </div>

            ))}

</div>

        </div>
    );
}
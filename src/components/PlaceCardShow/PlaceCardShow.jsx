import { useState, useEffect, useRef } from "react";
import 'react-edit-text/dist/index.css';
import { Link, useParams } from "react-router-dom";
import * as placeAPI from "../../utilities/places-api";
import * as tripAPI from "../../utilities/trips-api";
import MapsShow from '../../components/MapsShow/MapsShow';





export default function PlaceCardShow({ allPlaces, setAllPlaces, setUpdated, updated, allTrips, setAllTrips,  }) {
    const [distance, setDistance] = useState([])
    const [duration, setDuration] = useState([])
    const [theTrip, setTheTrip] = useState({});
    const [thePlaces, setThePlaces] = useState([]);




    const { id } = useParams();

    // const trip = allTrips.filter((trip) => trip._id === id);
    // console.log(trip)



    async function deletePlace(evt) {

        const thePlace = allPlaces.filter((place) => place._id !== evt.target.value);
        console.log(thePlace);
        setThePlaces(thePlace);

        const places = allPlaces.filter((place) => place._id !== evt.target.value);
        setAllPlaces(places);

        // setUpdated(!updated)

        const trip = allTrips.filter((trip) => trip._id === id);
        const otherTrips = allTrips.filter((trip) => trip._id !== id);
        console.log(trip[0].place)
        const newT = trip[0].place.filter((p) => p._id !== evt.target.value)
        // console.log(evt.target.value)
        // console.log(newT)
        trip[0].place = newT;
        // console.log(trip[0].place)
        // console.log(allTrips)
        // setAllTrips(...otherTrips,trip);
        // console.log(allTrips)

        await placeAPI.deletePlace(evt.target.value);
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
            <MapsShow

                allPlaces={allPlaces}
                setAllPlaces={setAllPlaces}
                setUpdated={setUpdated}
                updated={updated}
                distance={distance}
                setDistance={setDistance}
                duration={duration}
                setDuration={setDuration}
             
             
                allTrips={allTrips}
                setAllTrips={setAllTrips}
                theTrip={theTrip}
                thePlaces={thePlaces}

            />
            <div className="flex flex-row" >
                <h3 id="subtitle" className="font-bold text-xl text-[#CFFCFF] mt-2 ml-5">{theTrip.title}  </h3>

                <h3 className="font-bold text-xl text-[#CFFCFF] mt-2 ml-5">{`${theTrip.date}`.split('T')[0]}</h3>
            </div>
            <div className="flex flex-row items-center" >


                {thePlaces.map((p, idx) => (
                    <>
                        <div

                            className="border-black border-[2px] rounded-md pt-2 pb-4 px-4 font-light my-3 w-[13rem] h-98 text-left text-sm bg-white"
                            id="hardshadow"
                        >
                            <h3 id="subtitle" className="font-bold text-lg text-black">{p.name.split(',')[0]}</h3>
                            <h3 className="font-bold text-[#4C5454]">Staying for: </h3>
                            {p.staying ? <p className="font-light text-sm text-black" >{p.staying}</p> : <p className="font-light text-sm text-black"  >No information yet</p>}

                            <h3 className="font-bold text-[#4C5454] my-px">Note: </h3>
                            {p.note ? <p className="font-light text-sm text-black mb-3">{p.note}</p> : <p className="font-light text-sm text-black mb-3"  >No note yet</p>}
                            <div className="flex flex-row w-500 h-200">
                                <Link to={`/trips/editPlace/${p._id}`} id="linkButton" className="font-bold text-sm text-black w-200 h-50"> Edit </Link>
                                <p>&nbsp;</p>
                                <button onClick={deletePlace} value={p._id} className="font-bold text-sm text-black w-500 h-50 p-"> Delete</button>
                            </div>

                        </div>

                        {distance[idx] ?
                            <div className=" flex-column w-80 h-30 ">
                                <h1 className="font-black text-sm text-[#CFFCFF]">{"->"}</h1>
                                <p>&nbsp;</p>

                                <h3 className="font-black text-sm text-[#CFFCFF]">{distance[idx]}  </h3>
                                <h3 className="font-black text-sm text-[#CFFCFF]"> {duration[idx]}</h3>

                                <p>&nbsp;</p>
                                <h1 className="font-black text-sm text-[#CFFCFF]">{"->"}</h1>
                            </div>
                            : null}

                    </>


                ))}



            </div>

        </div>
    );
}
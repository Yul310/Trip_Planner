import { useState, useEffect, useRef } from "react";
import 'react-edit-text/dist/index.css';
import { Link, useParams } from "react-router-dom";
import * as placeAPI from "../../utilities/places-api";
import * as tripAPI from "../../utilities/trips-api";
import MapsShow from '../../components/MapsShow/MapsShow';





export default function PlaceCardShow({ allPlaces, setAllPlaces, setUpdated, updated, allTrips, setAllTrips, }) {
    const [distance, setDistance] = useState([])
    const [duration, setDuration] = useState([])
    const [theTrip, setTheTrip] = useState({});
    const [thePlaces, setThePlaces] = useState([]);
    const [updateMap, setUpdateMap] = useState(false);

    const { id } = useParams();



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


        await placeAPI.deletePlace(evt.target.value);
    }


    // //////////////////////////////////////////////////////////////////////////////////
    // I tested useEffect and setTimeout to see if those would help to update the props
    /////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        setTimeout(() => {
            const trip = allTrips.filter((trip) => trip._id === id);
            console.log(trip[0])
            setTheTrip(trip[0])
        }, 1000)
    }, [updated, theTrip, allTrips, allPlaces, id, updateMap])


    useEffect(() => {
        setTimeout(() => {
            const trip = allTrips.filter((trip) => trip._id === id);
            console.log(trip[0].place)
            setThePlaces(trip[0].place)
        }, 1000)
    }, [updated, thePlaces, allTrips, allPlaces, id, updateMap])





    return (

        <div className="">
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
                updateMap={updateMap}
                setUpdateMap={setUpdateMap}

            />
            <div className="mt-10">
                <ul className="flex flex-row items-center justify-between h-full " >


                    {thePlaces.map((p, idx) => (
                        <>
                            <li className="h-full w-[13rem] ">
                                <div

                                    className="flex flex-col h-100 content-between items-center border-black border-[2px] rounded-md pt-2 pb-4  font-light  text-left text-sm bg-white"
                                    id="hardshadow"
                                >
                                    <h3 id="subtitle" className="font-bold text-lg text-black">{p.name.split(',')[0]}</h3>
                                    <h3 className="font-bold text-[#4C5454]">Staying for: </h3>
                                    {p.staying ? <p className="font-light text-sm text-black" >{p.staying}</p> : <p className="font-light text-sm text-black"  >No information yet</p>}

                                    <h3 className="font-bold text-[#4C5454] my-px">Note: </h3>
                                    {p.note ? <p className="font-light text-sm text-black mb-3">{p.note}</p> : <p className="font-light text-sm text-black mb-3"  >No note yet</p>}
                                    <div className="flex flex-row w-500 h-200">
                                        <Link to={`/trips/editPlace/${p._id}`}  > <button className="font-bold text-sm text-black w-200 h-50 border-[2px]">Edit </button> </Link>
                                        <p>&nbsp;</p>
                                        <button onClick={deletePlace} value={p._id} className="font-bold text-sm text-black w-500 h-50 border-[2px]"> Delete</button>
                                    </div>

                                </div>
                            </li>

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



                </ul>
            </div>
        </div>
    );
}
//
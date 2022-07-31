import { loadAuth2WithProps } from "gapi-script";
import { useState, useEffect } from "react";
import * as tripAPI from "../../utilities/trips-api";
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import {Link } from "react-router-dom";


export default function TripIndexPage({ allTrips, setAllTrips, setUpdated, updated }) {


    // const [theTrip, setTheTrip] = useState({});
    // const [thePlaces, setThePlaces] = useState({});


    async function deleteTrip(evt) {
        const trips = allTrips.filter((trip) => trip._id !== evt.target.value);
        console.log(trips);
        setAllTrips(trips);
        //sending new data to backend
        await tripAPI.deleteTrip(evt.target.value);
        setUpdated(!updated)
        // calculateAllRoute()
    }

    function loopName(array) {
        for (let i = 1; i < array.length; i++) {
            return <h3 className="font-semibold"> {i + 1}. {array[i].name.split(',')[0]} </h3>
        }
    }


// function tripFinder(evt){
//     const trip = allTrips.filter((trip) => trip._id === evt.targe.value);
    
//     setTheTrip(trip[0])
//     console.log(trip[0].place)
//     setThePlaces(trip[0].place)
//     console.log(thePlaces)
//     console.log(theTrip)
// }


function update(){
    setUpdated(!updated)
}


    return (

        <div>
            <h1>My Trip</h1>

            {allTrips.map((trip, idx) => (



                <div
                    key={idx}
                    className="border-black border-[1px] rounded-md pt-2 pb-4 px-4 font-light my-3 w-[24.5rem] text-left"
                    id="hardshadow"
                >
                    <Link to={`/trips/showTrip/${trip._id}`} value={trip._id} onClick={update} >
                    <h3 className="font-bold text-xl">{trip.title}</h3>



                    <h3 className="font-medium">{`${trip.date}`.split('T')[0]}</h3>

                    {/* tempo{trip.place.length != 0 ?
                        <h3 className="font-semibold">{trip.place[0].name.split(',')[0]}</h3> : null
                    } */}

                    {trip.place.length != 0 ?
                        <h3 className="font-medium">
                            Starting from {trip.place[0].name.split(',')[0]}</h3> : <h3>no destinations yet</h3>
                    }

                   </Link>
                    {/* {date = new Date(trip.date)
                   `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`} */}

                    {/* tempo  {trip.place.length != 0 ?
                        loopName(trip.place) : null
                    } */}






                    <p>&nbsp;</p>
                    <button onClick={deleteTrip} value={trip._id} className="font-bold text-sm"> Delete </button>

                </div>
            ))}












        </div>

    )
}

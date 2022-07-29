import { loadAuth2WithProps } from "gapi-script";
import { useState, useEffect } from "react";
import * as tripAPI from "../../utilities/trips-api";


export default function TripIndexPage({ allTrips, setAllTrips, setUpdated, updated }) {




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
        for (let i = 0; i < array.length; i++) {
            return <h3 className="font-semibold"> {i+1}. {array[i].name.split(',')[0]} </h3>
        }
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
                    <h3 className="font-semibold">{trip.title}</h3>



                    <h3 className="font-semibold">{trip.date}</h3>

                    {/* {trip.place.length != 0 ?
                        <h3 className="font-semibold">{trip.place[0].name.split(',')[0]}</h3> : null
                    } */}

                    {trip.place.length != 0 ?
                        loopName(trip.place) : null
                    }





                    <p>&nbsp;</p>
                    <button onClick={deleteTrip} value={trip._id} className="font-bold text-sm"> Delete </button>

                </div>
            ))}












        </div>

    )
}

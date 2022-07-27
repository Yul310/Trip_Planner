import { useState, useEffect } from "react";




export default function TripIndexPage({ allTrips }) {


    ////////////////
    // CHANGE DATE
    ////////////////



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


            </div>
            ))}












        </div>

    )
}

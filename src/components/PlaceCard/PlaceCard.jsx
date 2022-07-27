import { useState, useEffect, useRef } from "react";

import * as placeAPI from "../../utilities/places-api";

export default function PlaceCard({ allPlaces, setAllPlaces }) {

    async function deletePlace(evt) {
        const places = allPlaces.filter((place) => place._id !== evt.target.value);
        console.log(places);
        setAllPlaces(places);
        //sending new data to backend
       await placeAPI.deletePlace(evt.target.value);
    }


    return (
        <>

            {allPlaces.map((place, idx) => (



                <div
                    key={idx}
                    className="border-black border-[1px] rounded-md pt-2 pb-4 px-4 font-light my-3 w-[24.5rem] text-left"
                    id="hardshadow"
                >
                    <h3 className="font-bold">{place.name.toUpperCase()}</h3>



                    <h3 className="font-semibold">Note: {place.note}</h3>

                    <button onClick={deletePlace } value={place._id}> Delete </button>

                </div>
            ))}


        </>

    );
}
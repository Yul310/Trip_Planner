import { loadAuth2WithProps } from "gapi-script";
import { useState, useEffect } from "react";
import * as tripAPI from "../../utilities/trips-api";
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { Link } from "react-router-dom";


export default function TripIndexPage({ allTrips, setAllTrips, setUpdated, updated, user }) {


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



    function update() {
        setUpdated(!updated)
    }

    const userName = user.name.charAt(0).toUpperCase() + user.name.slice(1);

    return (
        <div className="mt-40  ">

            <div className="w-600">
                <h1 className="mb-5 font-bold text-5xl text-[#CFFCFF] ">Hello,{userName}</h1>
                <Link to="/trips/new">
                <button className=" p-3 bg-black border-[#CFFCFF] border-[3px] rounded-md text-xl text-white" >
                    Clcik to Start Your Trip
                </button>
                </Link>
            </div>
            
            {/* <div id="dash">
            </div> */}
           

            <div className="flex flex-row mt-14 ml-14 ">

                <h3 className=" font-bold text-xl text-[#CFFCFF] mt-40">Your Saved Trips...</h3>

            </div>
            {allTrips.length ?
                <div className="flex flex-row mt-4 ml-7">

                    {allTrips.map((trip, idx) => (

                        <div
                            key={idx}
                            className="m-5 border-black border-[3px] rounded-md pt-2 pb-4 px-4 font-light my-3 w-[13rem] h-98 text-left text-sm bg-white"
                            id="hardshadow"
                        >
                            <Link to={`/trips/showTrip/${trip._id}`} value={trip._id} onClick={update} >
                                <h3 id="subtitle" className="font-bold text-lg text-black">{trip.title}</h3>



                                <h3 className="font-bold text-[#4C5454]">{`${trip.date}`.split('T')[0]}</h3>



                                {trip.place.length != 0 ?
                                    <h3 className="font-bold text-[#4C5454]">
                                        Starting from {trip.place[0].name.split(',')[0]}</h3 > : <h3 className="font-bold text-[#4C5454]">no destinations yet</h3>
                                }

                            </Link>


                            <p>&nbsp;</p>
                            <button onClick={deleteTrip} value={trip._id} className="font-bold text-sm text-black w-500 h-50 border-[1.5px] "> Delete </button>

                        </div>
                    ))}


                </div> :

                <div className="m-80">
                    <h3 className=" text-2xl font-bold text-[#CFFCFF]"> No Trip has been created. </h3>
                    <Link to="/trips/new">
                        <button className="m-10 py-1 px-3 text-lg text-[#4C5454]">Start a New Trip</button>
                    </Link>
                </div>



            }
        </div>
    )
}

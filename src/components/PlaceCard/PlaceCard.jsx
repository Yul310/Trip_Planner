import { useState, useEffect, useRef } from "react";
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { Link } from "react-router-dom";


import * as placeAPI from "../../utilities/places-api";
// import {calculateAllRoute} from '../Maps/Maps';




export default function PlaceCard({ allPlaces, setAllPlaces, distance, duration, setDistance, setDuration, setUpdated, updated }) {

    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        tripId: "",
        staying: "",
        note: "",
    });


    async function deletePlace(evt) {
        const places = allPlaces.filter((place) => place._id !== evt.target.value);
        console.log(places);
        setAllPlaces(places);
        //sending new data to backend
        await placeAPI.deletePlace(evt.target.value);
        setUpdated(!updated)
        // calculateAllRoute()
    }


    async function editPlace(evt) {

        const place = allPlaces.filter((place) => place._id === evt.target.value);
        console.log(evt.target.value)
        console.log(place);
        place[0].note = formData.note;
        place[0].staying = formData.staying;
        console.log(place)

        // const updatedCard = { ...formData, note: formData.note };
        // setFormData(updatedCard);
        // console.log(place);
        placeAPI.editPlace(evt.target.value, formData);

        // setUpdated(!updated)
        // handleEditing()

    }


    function handleChange(evt) {

        const updatedCard = { ...formData, [evt.target.name]: evt.target.value };
        setFormData(updatedCard);

        console.log(formData);
    }





    //*** function = Edit data ***//
    // function handleEditing(evt) {
    //     setEdit(!edit);
    // }

    // let viewMode = {};
    // let editMode = {};

    // if (edit) {
    //     viewMode.display = "none";
    // } else {
    //     editMode.display = "none";
    // }



    return (
        <>

            {allPlaces.map((place, idx) => (
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

                            {/* <input type="text" name="staying" className="w-36 h-8 text-align:start " value={place.staying} placeholder={place.staying} onChange={handleChange} style={editMode} /> */}

{/* 
                            <textarea name="staying" id="staying" cols="5" rows="5" placeholder={place.staying} className="w-36 h-8 text-align:start " value={formData.staying} ></textarea> */}


                            <h3 className="font-bold">Note: </h3>

                            {place.note ? <p >{place.note}</p> : <p className="font-light text-sm"  >No note yet</p>}



                            {/* <textarea name="note" id="" cols="5" rows="5" placeholder={place.note} className="w-36 h-32 text-align:start " value={formData.note}  ></textarea> */}
                            {/* <input type="text" name="note" className="w-36 h-32 text-align:start " key={place._id} value={place.note} placeholder={place.note} onChange={handleChange} style={editMode} /> */}
                        </form>
                        {/* <button onClick={editPlace} value={place._id} className="font-bold text-sm"> Update </button> */}

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
            ))}


        </>

    );
}
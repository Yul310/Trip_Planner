import { useState, useEffect, useRef } from "react";


import * as placeAPI from "../../utilities/places-api";





export default function PlaceCard({ allPlaces, setAllPlaces, distance, duration, setDistance, setDuration, setUpdated, updated }) {

    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        distance: "",
        time: "",
        note: "",
    });


    async function deletePlace(evt) {
        const places = allPlaces.filter((place) => place._id !== evt.target.value);
        console.log(places);
        setAllPlaces(places);
        //sending new data to backend
        await placeAPI.deletePlace(evt.target.value);
        setUpdated(!updated)
    }


    async function editPlace(evt) {

        const place = allPlaces.filter((place) => place._id === evt.target.value);
        console.log(evt.target.value)
        console.log(place);
        place[0].note = formData.note;
        console.log(place)
        
        // const updatedCard = { ...formData, note: formData.note };
        // setFormData(updatedCard);
        // console.log(place);
        placeAPI.editPlace(evt.target.value, formData);

        // setUpdated(!updated)
        handleEditing()

    }


    function handleChange(evt) {

        const updatedCard = { [evt.target.name]: evt.target.value };
        setFormData(updatedCard);
        console.log(updatedCard);
        console.log(formData);
    }





    //*** function = Edit data ***//
    function handleEditing(evt) {
        setEdit(!edit);
    }

    let viewMode = {};
    let editMode = {};

    if (edit) {
        viewMode.display = "none";
    } else {
        editMode.display = "none";
    }



    return (
        <>

            {allPlaces.map((place, idx) => (
                <>


                    <div
                        key={idx}
                        className=" border-black border-[1px] rounded-md pt-2 pb-4 px-4 font-light my-3 w-[13rem] h-98 text-left text-sm bg-[#AEC3B0]"
                        id="hardshadow"
                    >

                        <h3 className="font-bold" value={formData.name}>{place.name.split(',')[0].toUpperCase()}</h3>
                        <p className="font-light">{place.name.split(',')}</p>




                        <h3 className="font-bold">Note: </h3>
                          
                        {place.note? <p style={viewMode}>{place.note}</p> : <p className="font-light" style={viewMode} >No note yet</p>}

                       
                        

                        <input type="text" name="note" className="w-36 h-32 text-align:start " key={place._id}  placeholder={place.note} onChange={handleChange} style={editMode} />

                        <button onClick={editPlace} value={place._id} className="font-bold text-sm"> Update </button>

                        <p>&nbsp;</p>
                        <button onClick={deletePlace} value={place._id} className="font-bold text-sm"> Delete this destination </button>

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
import { useState, useEffect } from "react";
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import * as placeAPI from "../../utilities/places-api";


export default function PlaceEditPage({ allPlaces, setAllPlaces, distance, duration, setDistance, setDuration, setUpdated, updated }) {

  const [edit, setEdit] = useState(false);


  const navigate = useNavigate();
  const { id } = useParams();

  const thePlace = allPlaces.filter((place) => place._id === id);


  const [formData, setFormData] = useState({
    name: "",
    tripId: "",
    staying: thePlace[0].staying,
    note: thePlace[0].note,
  });


  async function deletePlace(evt) {



    const places = allPlaces.filter((place) => place._id !== evt.target.value);
    //  console.log(thePlace);

    setAllPlaces(places);

    await placeAPI.deletePlace(evt.target.value)
    console.log("delete working????")

    setUpdated(!updated)





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
    redirectToTrip();
    setUpdated(!updated)



  }



  function redirectToTrip() {
    let path = `/trips/showTrip/${thePlace[0].tripId}`
    navigate(path)

  }

  function redirectToTripShow() {
    // console.log(thePlace[0].tripId)
    let path = `/trips/showTrip/${thePlace[0].tripId}`
    navigate(path)
  }

  function handleChange(evt) {

    const updatedCard = { ...formData, [evt.target.name]: evt.target.value };
    setFormData(updatedCard);

    console.log(formData);
  }








  return (
    <>




      <div

        className=" border-black border-[1px] rounded-md pt-2 pb-4 px-4 font-light my-3 w-[13rem] h-98 text-left text-sm bg-[#AEC3B0]"
        id="hardshadow"
      >
        <form onChange={handleChange}>

          <h3 className="font-bold" value={formData.name}>{thePlace[0].name.split(',')[0]}</h3>
          <p className="font-light">{thePlace[0].name}</p>



          <h3 className="font-bold">Staying Time: </h3>



          <textarea name="staying" id="staying" cols="5" rows="5" placeholder={thePlace[0].staying} className="w-36 h-8 text-align:start " value={formData.staying} ></textarea>


          <h3 className="font-bold">Note: </h3>




          <textarea name="note" id="" cols="5" rows="5" placeholder={thePlace[0].note} className="w-36 h-32 text-align:start " value={formData.note}  ></textarea>

        </form>
        <button onClick={editPlace} value={thePlace[0]._id} className="font-bold text-sm"> Save </button>
        <button onClick={redirectToTripShow} value={thePlace[0]._id} className="font-bold text-sm"> Cancel  </button>

        {/* <p>&nbsp;</p> */}
        {/* <button onClick={deletePlace} value={id} className="font-bold text-sm"> Delete Place </button> */}

      </div>

      {/* {distance[idx] ?
            <div className=" flex-column w-80 h-30 ">
              <h1>{"->"}</h1>
              <p>&nbsp;</p>

              <h3 className="font-bold text-sm">{distance[idx]}  </h3>
              <h3 className="font-bold text-sm"> {duration[idx]}</h3>

              <p>&nbsp;</p>
              <h1>{"->"}</h1>
            </div>
            : null} */}




    </>

  );
}
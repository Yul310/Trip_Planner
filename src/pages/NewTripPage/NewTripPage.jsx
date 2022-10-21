import { useState } from "react";
import * as tripAPI from "../../utilities/trips-api";
import {useNavigate} from "react-router-dom";

export default function NewTripPage({ updated, setUpdated }) {

  const [formData, setFormData] = useState({
    // add in all the other fields
    title: "",
    date: "",
    time: "",
    note: "",
    place: []
  });



  let navigate = useNavigate();
  function redirectToIndex() {
    let path = '/trips'
    navigate(path)
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log(formData);

    tripAPI.newTrip(formData);
    setUpdated(!updated);
    setFormData({
      title: "",
      date: "",
      time: "",
      note: "",
      place: []
    });
    redirectToIndex();
  }


  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    console.log(formData);
  }


  



  return (

    <div className="mt-40 ">
      <h1 className="font-bold text-xl mb-5 ">New Trip</h1>
  
      <form onChange={handleChange} >
        
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Add title here..."
          className="w-100 h-8 bg-[#f7f7f2] border-b-[1px] border-black "
        />
        <p>&nbsp;</p>

        
        <input
          type="date"
          name="date"
          value={formData.date}
          className="w-100 h-8 bg-[#f7f7f2] border-b-[1px] border-black "
        />
        <p>&nbsp;</p>

        
        <input
          type="time"
          name="time"
          value={formData.time}
          className="w-100 h-8 bg-[#f7f7f2] border-b-[1px] border-black "
        />
        <p>&nbsp;</p>

       
        <input
          type="text"
          name="note"
          value={formData.note}
          placeholder="Add your note here..."
          className="w-100 h-8 bg-[#f7f7f2] border-b-[1px] border-black "
        />
        <p>&nbsp;</p>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-[#CFFCFF] border-[3px] text-l text-black font-black py-2 px-4 rounded-lg hover:ring hover:ring-orange-400"
        >
          Create
        </button>

      </form>
     
    </div>

  )
}

import { useState, useEffect } from "react";
import * as tripAPI from "../../utilities/trips-api";

export default function NewTripPage({updated,setUpdated}) {

    const [formData, setFormData] = useState({
        // add in all the other fields
        title: "",
        date: "",
        time: "",
        note: "",
        destination:""
      });

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
         destination:""
        });
      }


      function handleChange(evt) {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
        console.log(formData);
      }




    return (

        <div >
            <h1>New Trip</h1>
            <form action="" onChange={handleChange}>
                <label className="font-bold text-left text-lg h-1/2 px-2 py-2">
                Title
                </label>
                <input
                type="text"
                name="title"
                value={formData.title}
                placeholder="Add title here..."
                className="w-200 h-8 bg-[#f7f7f2] border-b-[1px] border-black "
                />
                <p>&nbsp;</p>

                <label className="font-bold text-left text-lg h-1/2 px-2 py-2">
                Date
                </label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    className="w-200 h-8 bg-[#f7f7f2] border-b-[1px] border-black "
                />
                <p>&nbsp;</p>

                <label className="font-bold text-left text-lg h-1/2 px-2 py-2">
                Time
                </label>
                <input
                    type="time"
                    name="time"
                    value={formData.time}
                    className="w-200 h-8 bg-[#f7f7f2] border-b-[1px] border-black "
                />
                <p>&nbsp;</p>
                
                <label className="font-bold text-left text-lg h-1/2 px-2 py-2">
                Note
                </label>
                <input
                type="text"
                name="note"
                value={formData.note}
                placeholder="Add your note here..."
                className="w-200 h-8 bg-[#f7f7f2] border-b-[1px] border-black "
                />
                <p>&nbsp;</p>
                <button
                type="submit"
                onClick={handleSubmit}
                className="bg-[#1f1f1f] text-white font-light py-2 px-4 rounded-lg hover:ring hover:ring-orange-400"
                 >
            Create
          </button>

            </form>
        </div>

        )
    }
    
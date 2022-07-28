const mongoose = require('mongoose')
const { Schema, model } = mongoose;
require("./place");
//-- Model ---------------------------------------------//

const tripSchema = new Schema(
  {
    title: {
    type: String,
    required: true,
    },
    date: Date, 
    time: {
        type:String
    },
    note: {
    type: String
    },
    destination: {
      type: Schema.Types.ObjectId, ref: "Place"
    },
  },
  {
    timestamps: true,
  }
);



// make category model
const Trip = model("Trip", tripSchema);

//-- Export Model ---------------------------------------------//
module.exports = Trip;




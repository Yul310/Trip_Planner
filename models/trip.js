const mongoose = require("mongoose");
const { Schema, model } = mongoose;


//-- Model ---------------------------------------------//

const trip = new Schema(
  {
    title: {
    type: String,
    required: true,
    },
    date: Date,
    hours: {
        type: Number, required: true, min: 0, max: 23
    },
    minutes: {
        type: Number, required: true, min: 0, max: 59
    },
    destinations:{
    type: Schema.Types.ObjectId, ref: "Destination" 
    },
    note: {
    type: String
    }
  },
  {
    timestamps: true,
  }
);

// make category model
const Trip = model("Trip", tripSchema);

//-- Export Model ---------------------------------------------//
module.exports = Trip;
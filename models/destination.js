const mongoose = require("mongoose");
const { Schema, model } = mongoose;


//-- Model ---------------------------------------------//

const destinationSchema = new Schema(
  {
    origin: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    distance:{
        type: String,
    },
    time:{
        type:String,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// make category model

module.exports = mongoose.model("Destination", destinationSchema);

const mongoose = require("mongoose");
const { Schema, model } = mongoose;


//-- Model ---------------------------------------------//

const placeSchema = new Schema(
  {
    name: {
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
module.exports = mongoose.model("Place",placeSchema);

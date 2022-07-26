const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
      type: Schema.Types.ObjectId, ref: "destination"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trip", tripSchema);
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
        type:Date
    },
    note: {
    type: String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trip", tripSchema);

const Place = require('../../models/place');
const Trip = require('../../models/trip');

module.exports = {

  create,
  index,
  deletePlace,
  editPlace,

};

async function index(req, res) {
  try {
    console.log("place index controller!!!")
    const placeList = await Place.find({});
    res.json(placeList);
  } catch {
    res.status(400).json('Bad Serverside')
  }
}



// create new todos
async function create(req, res) {
  console.log("place create Controller 1")
  try {
    // console.log(req.body)
    const newPlace = await Place.create(req.body);
    // console.log(newPlace)
    const placeList = await Place.find({});
    // console.log(placeList)
    // placeList.push(newPlace)
    
    const theOne = await Trip.findById(newPlace.tripId)

    theOne.place.push(newPlace._id)

    theOne.save()
    
    // console.log(theOne)
    // await placeList.save();
   
    console.log(placeList)
  
    res.json(placeList);
  } catch (e) {
    res.status(400).json(e)
  }
}

async function deletePlace(req, res) {
  // console.log(req.body)
  ("place delete Controller 1")
  try {
    console.log(req.params.id);
    const place = await Place.findById(req.params.id)
    const deleteOne = await Place.findByIdAndDelete(req.params.id);



    const theTrip = await Trip.findOneAndUpdate({ _id: place.tripId }, { $pull: { place: place._id } }, { new: true })
    console.log(theTrip)

  } catch (e) {
    res.status(400).json(e);
  }
}


// to edit a place card
async function editPlace(req, res) {
  const placeList = await Place.findByIdAndUpdate(
    { _id: req.params.id },
    {
      staying: req.body.staying,
      note: req.body.note,
    }, { new: true }

  );
  console.log("edit starated")
}
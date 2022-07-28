
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
    const newPlace = await Place.create(req.body);
    const placeList = await Place.find({});
    placeList.push(newPlace)

    const theOne = await Trip.findById(newPlace.tripId)
    console.log("theOne")
    theOne.destination.push(newPlace._id)


    await placeList.save();
   
    theOne.save()

    response.json(placeList);
  } catch (e) {
    res.status(400).json(e)
  }
}

async function deletePlace(req, res) {
  // console.log(req.body)
  ("place delete Controller 1")
  try {
    console.log(req.params.id);
    // const one = await Category.findById(req.params.id)
    const one = await Place.findByIdAndDelete(req.params.id);
    // const one = await Category.findOneAndRemove({ _Id: req.params.id } )
    // const catList = await Category.find({})
    // await catList.save()
    // res.json(catList)
  } catch (e) {
    res.status(400).json(e);
  }
}


// to edit a place card
async function editPlace(req, res) {
  const placeList = await Place.findByIdAndUpdate(
    { _id: req.params.id },
    {

      note: req.body.note,
    }, { new: true }

  );
  console.log("edit starated")
}
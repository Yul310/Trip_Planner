const Trip = require('../../models/trip');
const Place = require('../../models/place');

module.exports = {

  create,
  index,
  deleteTrip,
  showTrip

};

async function index(req, res) {
  try {
    console.log("trip index controller!!!")
    const tripList = await Trip.find({}).populate("place").exec();
    console.log(tripList)
    res.json(tripList);
  } catch {
    res.status(400).json('Bad Serverside')
  }
}



// create new todos
async function create(req, res) {
    console.log("Trip create Controller 1")
  try {
    
    const newTrip = await Trip.create(req.body);
    const tripList = await Trip.find({});
    tripList.push(newTrip)
    console.log("Trip Create Controller 2")
    await tripList.save();
    response.json(tripList);
  } catch (e) {
    res.status(400).json(e)
  }
}


// need to find all todos for a specific user - this might not be necessary -K
// async function findAllTodos(userId) {
//   return await this.find({ user: userId });
// }


// to delete a todo
async function deleteTrip(req, res) {
  try {
    console.log(req.params.id)
    const one = await Trip.findByIdAndDelete(req.params.id)
  } catch (e) {
    res.status(400).json(e);
  }
}

// to edit a todo
// async function editTrip(req, res) {
//   const tripList = await Trip.findByIdAndUpdate(
//     {_id:req.params.id},
//     {
//       title: req.body.title,
//       date: req.body.date,
//       time: req.body.description,
//       note: req.body.urgency,
//     },{new:true}
//   );
//   console.log("edit starated")
// }

async function showTrip(req, res) {
  console.log("req.params.id")
  const tripList = await Trip.findById(req.params.id);
  res.json(tripList);
}
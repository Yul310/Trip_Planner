const Destination = require('../../models/destination');


module.exports = {

  create,
  index

};

async function index(req, res) {
  try {
    console.log("destination controller!!!")
    const destinationList = await Destination.find({});
    res.json(destinationList);
  } catch {
    res.status(400).json('Bad Serverside')
  }
}



// create new todos
async function create(req, res) {
    console.log("destination create Controller 1")
  try {
    const newDestination = await Destination.create(req.body);
    const destinationList = await Destination.find({});
    destinationList.push(newDestination)
    await destinationList.save();
    response.json(destinationList);
  } catch (e) {
    res.status(400).json(e)
  }
}

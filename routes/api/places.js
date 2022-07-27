const express = require('express');
const router = express.Router();
const placesCtrl = require('../../controllers/api/places');

// GET /api/todos
router.get('/', placesCtrl.index);

//POST /api/todos/new
router.post('/newPlace', placesCtrl.create);

// // POST /api/todos
// router.put("/editTrip/:id", tripsCtrl.editTodo);

// DELETE /api/todos/:id
router.delete('/deletePlace/:id',placesCtrl.deletePlace);

// // GET /api/todos/:id
// router.get('/:id', tripsCtrl.show);

module.exports = router;

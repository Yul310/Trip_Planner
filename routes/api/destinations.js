const express = require('express');
const router = express.Router();
const destinationsCtrl = require('../../controllers/api/Destinations');

// GET /api/todos
router.get('/', destinationsCtrl.index);

//POST /api/todos/new
router.post('/newDestination', destinationsCtrl.create);

// // POST /api/todos
// router.put("/editTrip/:id", tripsCtrl.editTodo);

// // DELETE /api/todos/:id
// router.delete('/deleteTrip/:id', tripsCtrl.deleteTodo);

// // GET /api/todos/:id
// router.get('/:id', tripsCtrl.show);

module.exports = router;

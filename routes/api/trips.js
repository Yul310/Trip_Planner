const express = require('express');
const router = express.Router();
const tripsCtrl = require('../../controllers/api/Trips');

// GET /api/todos
router.get('/', tripsCtrl.index);

//POST /api/todos/new
router.post('/newTrip', tripsCtrl.create);

// // POST /api/todos
// router.put("/editTrip/:id", tripsCtrl.editTodo);

// DELETE /api/todos/:id
router.delete('/deleteTrip/:id', tripsCtrl.deleteTrip);



// // GET /api/todos/:id
 router.get('/api/showTrip/:id', tripsCtrl.showTrip);

module.exports = router;

const Workout = require ('../models/workoutModel')

const {createWorkout,
        getWorkouts,
        getWorkout,
        deleteWorkout,
        updateWorkout
        } = require ('../controllers/workoutControllers')

const express = require('express')

const router = express.Router()


//get all workouts
router.get('/',getWorkouts)

//get a single workout
router.get('/:id',getWorkout)

//POST a new workout
router.post('/', createWorkout)

//DELETE a workout
router.delete('/:id',deleteWorkout)

//UPDATE a workout 
router.patch('/:id',updateWorkout)

module.exports = router
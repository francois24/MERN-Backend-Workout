const Workout = require ('../models/workoutModel')
const mongoose = require('mongoose')
const { request } = require('express')
//get all Workouts
const getWorkouts = async (req,res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

//get single workout
const getWorkout = async (req,res)=> {
    const { id } = req.params

   c

    const workout = await Workout.findById(id)

    if(!workout){
        res.status(404).json({msg:'No such workout'})
    }
    res.status(200).json(workout)
}

//create new workout
const createWorkout = async (req,res) => {
    const {title, load, reps} = req.body

    let emptyFields = []

    if (!title){
        emptyFields.push('title')
    }
    if (!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields',emptyFields})
    }

    //add to db
    try {
        const workout = await Workout.create({title,load,reps})
        res.status(200).json(workout)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a workout 
const deleteWorkout = async (req,res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg:'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id : id})

    if(!workout){
        res.status(400).json({msg:'No such workout'})
    }

    res.status(200).json(workout)
}

//update a workout
const updateWorkout = async(req,res)=>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg:'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!workout){
        res.status(400).json({msg:'No such workout'})
    }

    res.status(200).json(workout)

}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}
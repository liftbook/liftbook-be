//ENDPOINT: /api/exercises

//IMPORTS
const express = require('express')
//local
const mwExercise = require('../middleware/exercises')

//SETUP
const router = express.Router()
//models
const modelExercises = require('../models/exercises')

//ROUTES
//create
router.post('/', mwExercise.check_required, mwExercise.check_unqiue, mwExercise.prepare_new, async (req, res) => {
    try {
        const exercise = await modelExercises.add_exercise(req.body)
        exercise
        ?   res.status(201).json(exercise)
        :   res.status(404).json({message: `Exercise couldn't be added.`})
    } catch (err) {
        console.log('add exercise err:', err)
        res.status(500).json(err)
    }
})
//read
router.get('/', async (req, res) => {
    try {
        const exercises = await modelExercises.get_all_exercises()
        exercises.length > 0
        ?   res.status(200).json(exercises)
        :   res.status(404).json({message: `No exercises found.`})
    } catch (err) {
        console.log('get all exercises err:', err)
        res.status(500).json(err)
    }
})
router.get('/:exercise', async (req, res) => {
    try {
        const exercise = await modelExercises.get_by_id_or_name(req.params.exercise)
        exercise
        ?   res.status(200).json(exercise)
        :   res.status(404).json({message: `Couldn't find exercise: ${req.params.exercise}`})
    } catch (err) {
        console.log('get exercise by name or id err:', err)
        res.status(500).json(err)
    }
})
//update
router.put('/:exercise', mwExercise.check_unqiue, mwExercise.get, mwExercise.update, async (req, res) => {
    try {
        await modelExercises.update_exercise(req.body)
        ?   res.status(200).json(req.body)
        :   res.status(404).json({message: `Exercise ${req.params.exercise} couldn't be found.`})
    } catch (err) {
        console.log('update exercise by id err:', err)
        res.status(500).json(err)
    }
})
// delete
router.delete('/:exercise', mwExercise.get, mwExercise.update, async (req, res) => {
    try {
        const exercises = await modelExercises.remove_exercise(req.body.eid)
        exercises > 0
        ?   res.status(200).json(exercises)
        :   res.status(404).json(exercises)
    } catch (err) {
        console.log('remove exercise err:', err)
        res.status(500).json(err)
    }
})

//EXPORTS
module.exports = router
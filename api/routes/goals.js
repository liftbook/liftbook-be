//ENDPOINT: /api/goals
//IMPORTS
const express = require('express')
//local
const modelGoal = require('../models/goals')
const mwGoal = require('../middleware/goals.js')

//SETUP
const router = express.Router()

// _______  _______  _______  ___        ______    _______  __   __  _______  _______  _______ 
//|       ||       ||   _   ||   |      |    _ |  |       ||  | |  ||       ||       ||       |
//|    ___||   _   ||  |_|  ||   |      |   | ||  |   _   ||  | |  ||_     _||    ___||  _____|
//|   | __ |  | |  ||       ||   |      |   |_||_ |  | |  ||  |_|  |  |   |  |   |___ | |_____ 
//|   ||  ||  |_|  ||       ||   |___   |    __  ||  |_|  ||       |  |   |  |    ___||_____  |
//|   |_| ||       ||   _   ||       |  |   |  | ||       ||       |  |   |  |   |___  _____| |
//|_______||_______||__| |__||_______|  |___|  |_||_______||_______|  |___|  |_______||_______|

//create
router.post('/', mwGoal.check_required, mwGoal.prepare_new, async (req, res) => {
    try {
        const goal = await modelGoal.add(req.body)
        goal
        ?   res.status(201).json(goal)
        :   res.status(404).json({message: `Goal couldn't be added.`})
    } catch (err) {
        console.log('add goal err:', err)
        res.status(500).json(err)
    }
})

//read
router.get('/', async (req, res) => {
    try {
        const goals = await modelGoal.get_all()
        goals.length > 0
        ?   res.status(200).json(goals)
        :   res.status(404).json({message: `No goals found.`})
    } catch (err) {
        console.log('get all goals err:', err)
        res.status(500).json(err)
    }
})
router.get('/:goal', async (req, res) => {
    try {
        const goal = await modelGoal.get_by({gid: req.params.goal})
        goal
        ?   res.status(200).json(goal)
        :   res.status(404).json({message: `No goals found.`})
    } catch (err) {
        console.log('get goal by id err:', err)
        res.status(500).json(err)
    }
})

//update
router.put('/:goal', mwGoal.get, mwGoal.update, async (req, res) => {
    try {
        const goal = await modelGoal.update(req.body)
        goal
        ?   res.status(200).json(goal)
        :   res.status(404).json({message: `Couldn't update goal ${req.params.goal}`})
    } catch (err) {
        console.log('update goal err:', err)
        res.status(500).json(err)
    }
})

//delete
router.delete('/:goal', async (req, res) => {
    try {
        await modelGoal.remove_by({gid: req.params.goal})
        ?   res.status(200).json({message: `Goal ${req.params.goal} has been removed.`})
        :   res.status(404).json({message: `Goal ${req.params.goal} couldn't be found.`})
    } catch (err) {
        console.log('remove goal by id err:', err)
        res.status(500).json(err)
    }
})

//EXPORTS
module.exports = router
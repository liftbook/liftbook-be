//ENDPOINT: /api/users 

//IMPORTS
const express = require('express')
//local
const mwAuth = require('../middleware/auth')
const mwUsers = require('../middleware/users')
const mwExercises = require('../middleware/exercises')

//SETUP
const router = express.Router()
//models
const modelUsers = require('../models/users')
const modelLog = require('../models/logs')
const modelGoal = require('../models/goals')

//ROUTES
//create
router.post('/register', mwAuth.register, async (req, res) => {
    try {
        const user = await modelUsers.add_user(req.body)
        user
        ?   res.status(201).json(user)
        :   res.status(404).json({message: `User couldn't be added.`})
    } catch (err) {
        console.log('user register err:',err)
        res.status(500).json(err)
    }
})
router.post('/login', mwAuth.authenticate, mwAuth.username_exists, mwAuth.password_matches, async (req, res) => {
    try {
        const user = await modelUsers.get_user_by({username: req.body.username})
        user
        ?   res.status(201).json({message: `login successful`, token: req.authorization, username: req.body.username})
        :   res.status(404).json({message: `Wong!`})
    } catch (err) {
        console.log('user login err:',err)
        res.status(500).json(err)
    }
})
//read
router.get('/', async (req, res) => {
    try {
        const users = await modelUsers.get_all_users()
        users.length > 0
        ?   res.status(200).json(users)
        :   res.status(404).json({message: `No users found.`})
    } catch (err) {
        console.log('get all users err:',err)
        res.status(500).json(err)
    }
})
router.get('/:username', async (req, res) => {
    try {
        const user = await modelUsers.get_user_by({username: req.params.username})
        user
        ?   res.status(200).json(user)
        :   res.status(404).json({message: `Couldn't find user: ${req.params.id}`})
    } catch (err) {
        console.log('get user by id err:',err)
        res.status(500).json(err)
    }
})
router.get('/:username/logs', async (req, res) => {
    try {
        const logs = await modelLog.get_user_logs(req.params.username)
        logs.length > 0
        ?   res.status(200).json(logs)
        :   res.status(404).json({message: `Couldn't find logs for ${req.params.username}`})
    } catch (err) {
        console.log('get user logs err:', err)
        res.status(500).json(err)
    }
})
router.get('/:username/logs/:exercise', async (req, res) => {
    try {
        const logs = await modelLog.get_user_logs_by_exercise(req.params.username, req.params.exercise)
        logs.length > 0
        ?   res.status(200).json(logs)
        :   res.status(404).json({message: `Couldn't find a log for exercise ${req.params.exercise} for user ${req.params.username}.`})
    } catch (err) {
        console.log('get user logs for exercise err:', err)
        res.status(500).json(err)
    }
})
router.get('/:username/goals', async (req, res) => {
    try {
        const goals = await modelGoal.get_user_goals(req.params.username)
        goals.length > 0
        ?   res.status(200).json(goals)
        :   res.status(404).json({message: `Couldn't find goals for ${req.params.username}`})
    } catch (err) {
        console.log('get user goals err:', err)
        res.status(500).json(err)
    }
})
router.get('/:username/goals/:exercise', async (req, res) => {
    try {
        const goals = await modelGoal.get_user_goals_by_exercise(req.params.username, req.params.exercise)
        goals.length > 0
        ?   res.status(200).json(goals)
        :   res.status(404).json({message: `Couldn't find a goal for exercise ${req.params.exercise} for user ${req.params.username}.`})
    } catch (err) {
        console.log('get user goals for exercise err:', err)
        res.status(500).json(err)
    }
})
//EXPORTS
module.exports = router
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
const modelLogs = require('../models/logs')

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
router.post('/login', mwAuth.authenticate, async (req, res) => {
    try {
        const user = await modelUsers.get_user_by({username: req.body.username})
        user
        ?   res.status(201).json({message: `login successful`, token: req.authorization})
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
/*
    NEEDS MIDDLEWARE
*/
router.get('/:username/logs', mwUsers.check_user, async (req, res) => {
    try {
        const logs = await modelLogs.get_all_user_logs(req.body.uid)
        logs.length > 0
        ?   res.status(200).json(logs)
        :   res.status(404).json({message: `Couldn't find any logs for user ${req.params.uid}.`})
    } catch (err) {
        console.log('get all user logs for exercise err:', err)
        res.status(500).json(err)
    }
})
/*
    NEEDS MIDDLEWARE
*/
router.get('/:username/logs/:exercise', mwUsers.check_user, mwExercises.check_exercise, async (req, res) => {
    try {
        const logs = await modelLogs.get_all_user_logs_for_exercise(req.body.uid, req.body.eid)
        logs.length > 0
        ?   res.status(200).json(logs)
        :   res.status(404).json({message: `Couldn't find any logs for exercise ${req.params.exercise} by user ${req.params.username}.`})
    } catch (err) {
        console.log('get all user logs for exercise err:', err)
        res.status(500).json(err)
    }
})
//EXPORTS
module.exports = router
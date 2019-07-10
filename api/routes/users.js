//ENDPOINT: /api/users

//IMPORTS
const express = require('express')
//local
const auth = require('../middleware/auth')

//SETUP
const router = express.Router()
//models
const modelUsers = require('../models/users')

//ROUTES
//create
router.post('/register', auth.register, async (req, res) => {
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
router.post('/login', async (req, res) => {
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
//RRRRRRrrrr
router.get('/', async (req, res) => {
    try {
        const users = await modelUsers.get_all_users()
        users.length > 0
        ?   res.status(200).json(users)
        :   res.status(404).json({message: `Couldn't find any users.`})
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

module.exports = router
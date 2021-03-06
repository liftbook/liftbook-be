//ENDPOINT: /api/logs
//IMPORTS
const express = require('express')
//local
const modelLog = require('../models/logs')
const mwLog = require('../middleware/logs')

//SETUP
const router = express.Router()

// ___      _______  _______    ______    _______  __   __  _______  _______  _______ 
//|   |    |       ||       |  |    _ |  |       ||  | |  ||       ||       ||       |
//|   |    |   _   ||    ___|  |   | ||  |   _   ||  | |  ||_     _||    ___||  _____|
//|   |    |  | |  ||   | __   |   |_||_ |  | |  ||  |_|  |  |   |  |   |___ | |_____ 
//|   |___ |  |_|  ||   ||  |  |    __  ||  |_|  ||       |  |   |  |    ___||_____  |
//|       ||       ||   |_| |  |   |  | ||       ||       |  |   |  |   |___  _____| |
//|_______||_______||_______|  |___|  |_||_______||_______|  |___|  |_______||_______|

//create
router.post('/', mwLog.check_required, mwLog.prepare_new, async (req, res) => {
    try {
        const log = await modelLog.add(req.body)
        log
        ?   res.status(201).json(log)
        :   res.status(404).json({message: `Log couldn't be added.`})
    } catch (err) {
        console.log('add log err:', err)
        res.status(500).json(err)
    }
})

//read
router.get('/', async (req, res) => {
    try {
        const logs = await modelLog.get_all()
        logs.length > 0
        ?   res.status(200).json(logs)
        :   res.status(404).json({message: `No logs found.`})
    } catch (err) {
        console.log('get all logs err:', err)
        res.status(500).json(err)
    }
})
router.get('/:log', async (req, res) => {
    try {
        const log = await modelLog.get_by({lid: req.params.log})
        log
        ?   res.status(200).json(log)
        :   res.status(404).json({message: `No logs found.`})
    } catch (err) {
        console.log('get log by id err:', err)
        res.status(500).json(err)
    }
})

//update
router.put('/:log', mwLog.get, mwLog.update, async (req, res) => {
    try {
        const log = await modelLog.update(req.body)
        log
        ?   res.status(200).json(log)
        :   res.status(404).json({message: `Couldn't update log ${req.params.log}`})
    } catch (err) {
        console.log('update log err:', err)
        res.status(500).json(err)
    }
})

//delete
router.delete('/:log', async (req, res) => {
    try {
        const logs = await modelLog.remove_by({lid: req.params.log})
        log.length > 0
        ?   res.status(200).json(logs)
        :   res.status(404).json(logs)
    } catch (err) {
        console.log('remove log by id err:', err)
        res.status(500).json(err)
    }
})

//EXPORTS
module.exports = router
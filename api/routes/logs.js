//ENDPOINT: /api/logs

//IMPORTS
const express = require('express')
//local
const mwLogs = require('../middleware/logs')

//SETUP
const router = express.Router()
//models
const modelLogs = require('../models/logs')

//ROUTES
//create
router.post('/', mwLogs.add, async (req, res) => {
    try {
        const log = await modelLogs.add_log(req.body)
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
        const logs = await modelLogs.get_all_logs()
        logs.length > 0
        ?   res.status(200).json(logs)
        :   res.status(404).json({message: `No logs found.`})
    } catch (err) {
        console.log('get all logs err:', err)
        res.status(500).json(err)
    }
})
router.get('/:lid', async (req, res) => {
    try {
        const log = await modelLogs.get_log_by({lid: req.params.lid})
        log
        ?   res.status(200).json(log)
        :   res.status(404).json({message: `No log found with id: ${req.params.lid}.`})
    } catch (err) {
        console.log('get all user logs err:', err)
        res.status(500).json(err)
    }
})
//update
router.put('/:lid', mwLogs.update, async (req, res) => {
    try {
        await modelLogs.update_log(req.params.lid, req.body)
        ?   res.status(200).json(req.body)
        :   res.status(404).json({message: `Log ${req.params.lid} couldn't be found.`})
    } catch (err) {
        console.log('update log err:', err)
        res.status(500).json(err)
    }
})
//delete
router.delete('/:lid', async (req, res) => {
    try {
        await modelLogs.remove_log(req.params.lid)
        ?   res.status(200).json({message: `Log ${req.params.lid} has been eliminated.`})
        :   res.status(404).json({message: `Log ${req.params.lid} couldn't be found.`})
    } catch (err) {
        console.log('remove log err:', err)
        res.status(500).json(err)
    }
})
//??????????????????????????????
router.delete('/', async (req, res) => {
    try {

    } catch (err) {
        console.log('remove all logs err:', err)
        res.status(500).json(err)
    }
})
//????????????????????????????
router.delete('/:uid', async (req, res) => {
    try {

    } catch (err) {
        console.log('remove all user logs err:', err)
        res.status(500).json(err)
    }
})
//??????????????????????????????
router.delete('/:uid/:eid', async (req, res) => {
    try {

    } catch (err) {
        console.log('remove all user logs for exercise err', err)
        res.status(500).json(err)
    }
})

//EXPORTS
module.exports = router
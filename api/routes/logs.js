//ENDPOINT: /api/exercises

//IMPORTS
const express = require('express')
//local
// const mwLogs = require('../middleware/logs')

//SETUP
const router = express.Router()
//models
const modelLogs = require('../models/logs')

//ROUTES
//create
router.post('/', async (req, res) => {
    try {

    } catch (err) {
        console.log('add log err:', err)
        res.status(500).json(err)
    }
})
//read
router.get('/', async (req, res) => {
    try {

    } catch (err) {
        console.log('get all logs err:', err)
        res.status(500).json(err)
    }
})
router.get('/:uid', async (req, res) => {
    try {

    } catch (err) {
        console.log('get all user logs err:', err)
        res.status(500).json(err)
    }
})
router.get('/:uid/:eid', async (req, res) => {
    try {

    } catch (err) {
        console.log('get all user logs for exercise err:', err)
        res.status(500).json(err)
    }
})
//update
router.put('/:lid', async (req, res) => {
    try {

    } catch (err) {
        console.log('update log err:', err)
        res.status(500).json(err)
    }
})
//delete
router.delete('/:lid', async (req, res) => {
    try {

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
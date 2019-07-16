// _______  __   __  _______  ______    _______  ___   _______  _______    _______  _______  _______  _______  _______ 
//|       ||  |_|  ||       ||    _ |  |       ||   | |       ||       |  |       ||       ||       ||       ||       |
//|    ___||       ||    ___||   | ||  |       ||   | |  _____||    ___|  |_     _||    ___||  _____||_     _||  _____|
//|   |___ |       ||   |___ |   |_||_ |       ||   | | |_____ |   |___     |   |  |   |___ | |_____   |   |  | |_____ 
//|    ___| |     | |    ___||    __  ||      _||   | |_____  ||    ___|    |   |  |    ___||_____  |  |   |  |_____  |
//|   |___ |   _   ||   |___ |   |  | ||     |_ |   |  _____| ||   |___     |   |  |   |___  _____| |  |   |   _____| |
//|_______||__| |__||_______||___|  |_||_______||___| |_______||_______|    |___|  |_______||_______|  |___|  |_______| 

//IMPORTS
const request = require('supertest')
const server = require('../api/server')
const db = require('../data/config')

//GLOBALS
const api = '/api/exercises'

//TESTS
describe('exercises', () => {
    describe('add', () => {
        afterEach(async () => await db('exercises').truncate())
        const route = api

        it('should receive status 201', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(`/api/users/register`).send(user)

            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            const res = await request(server).post(route).send(exercise)
            expect(res.status).toBe(201)
        })
        it('should receive exercise back', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(`/api/users/register`).send(user)

            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            const res = await request(server).post(route).send(exercise)
            expect(res.body.name).toBe('backflip')
        })
        it('should receive status 500 with missing fields', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(`/api/users/register`).send(user)

            const exercise = {eid: '1', name: 'backflip', username: 'gordon'}
            const res = await request(server).post(route).send(exercise)
            expect(res.status).toBe(500)
        })
    })
    describe('get', () => {
        afterEach(async () => await db('exercises').truncate())
        const route = api

        it('should receive status 200', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(`/api/users/register`).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route).send(exercise)

            const res = await request(server).get(route)
            expect(res.status).toBe(200)
        })
        it('should receive array of exercises', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(`/api/users/register`).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route).send(exercise)

            const res = await request(server).get(route)
            expect(res.body).toHaveLength(1)
        })
        it('should receive requested exercise', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(`/api/users/register`).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route).send(exercise)

            const res = await request(server).get(`${route}/backflip`)
            expect(res.body.description).toBe('nope')
        })
    })
    describe('update', () => {
        afterEach(async () => await db('exercises').truncate())
        const route = api

        it('should receive status 200', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(`/api/users/register`).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route).send(exercise)

            const update = {name: 'bellyflop'}
            const res = await request(server).put(`${route}/backflip`).send(update)
            expect(res.status).toBe(200)
        })
        it('should return updated object', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(`/api/users/register`).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route).send(exercise)

            const update = {name: 'bellyflop'}
            const res = await request(server).put(`${route}/backflip`).send(update)
            expect(res.body.name).toBe('bellyflop')
        })
    })
    describe('remove', () => {
        afterEach(async () => await db('exercises').truncate())
        const route = api

        it('should receive status 200', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(`/api/users/register`).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route).send(exercise)

            const res = await request(server).delete(`${route}/backflip`)
            expect(res.status).toBe(200)
        })
        it('should remove exercise from db', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(`/api/users/register`).send(user)
            //add exercises
            const exercise1 = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            const exercise2 = {eid: '2', name: 'bellyflop', username: 'gordon', description: 'nope'}
            await request(server).post(route).send(exercise1)
            await request(server).post(route).send(exercise2)

            await request(server).delete(`${route}/backflip`)
            const res = await request(server).get(route)
            expect(res.body).toHaveLength(1)
        })
    })
})
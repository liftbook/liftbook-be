// ___      _______  _______    _______  _______  _______  _______  _______ 
//|   |    |       ||       |  |       ||       ||       ||       ||       |
//|   |    |   _   ||    ___|  |_     _||    ___||  _____||_     _||  _____|
//|   |    |  | |  ||   | __     |   |  |   |___ | |_____   |   |  | |_____ 
//|   |___ |  |_|  ||   ||  |    |   |  |    ___||_____  |  |   |  |_____  |
//|       ||       ||   |_| |    |   |  |   |___  _____| |  |   |   _____| |
//|_______||_______||_______|    |___|  |_______||_______|  |___|  |_______| 

//IMPORTS
const request = require('supertest')
const server = require('../api/server')
const db = require('../data/config')

//ROUTES
const route_logs = '/api/logs'
const route_users = '/api/users'
const route_register = route_users + '/register'
const route_exercises = '/api/exercises'

xdescribe('logs', () => {
    describe('add', () => {
        afterEach(async () => await db('logs').truncate())

        it('should receive status 201', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)

            const log = {lid: '1', username: 'gordon', exercise: 'backflip'}
            const res = await request(server).post(route_logs).send(log)
            expect(res.status).toBe(201)
        })
        it('should receive log back', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)

            const log = {lid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            const res = await request(server).post(route_logs).send(log)
            expect(res.body.weight).toBe('3000')
        })
        it('should receive status 500 with missing fields', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)

            const log = {lid: '1', username: 'gordon'}
            const res = await request(server).post(route_logs).send(log)
            expect(res.status).toBe(612)
        })
    })
    describe('get', () => {
        afterEach(async () => await db('logs').truncate())

        it('should receive status 200', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)
            //add log
            const log = {lid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            await request(server).post(route_logs).send(log)

            const res = await request(server).get(route_logs)
            expect(res.status).toBe(200)
        })
        it('should receive array of logs', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)
            //add goal
            const log = {lid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            await request(server).post(route_logs).send(log)

            const res = await request(server).get(route_logs)
            expect(res.body).toHaveLength(1)
        })
        it('should receive requested log', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)
            //add log
            const log = {lid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            await request(server).post(route_logs).send(log)
            //get hashed log id
            let res = await request(server).get(route_logs)
            const lid = res.body[0].lid

            res = await request(server).get(`${route_logs}/${lid}`)
            expect(res.body.weight).toBe('3000')
        })
    })
    describe('update', () => {
        afterEach(async () => await db('logs').truncate())
        it('should receive status 201', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)
            //add log
            const log = {lid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            await request(server).post(route_logs).send(log)
            //get hashed log id
            let res = await request(server).get(route_logs)
            const lid = res.body[0].lid

            const update = {weight: '10000'}
            res = await request(server).put(`${route_logs}/${lid}`).send(update)
            expect(res.status).toBe(200)
        })
        it('should return updated object', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)
            //add log
            const log = {lid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            await request(server).post(route_logs).send(log)
            //get hashed log id
            let res = await request(server).get(route_logs)
            const lid = res.body[0].lid
    
            const update = {weight: '10000'}
            res = await request(server).put(`${route_logs}/${lid}`).send(update)
            expect(res.body.weight).toBe('10000')
        })
    })
    describe('remove', () => {
        afterEach(async () => await db('logs').truncate())
        it('should return status 200', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)
            //add log
            const log = {lid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            await request(server).post(route_logs).send(log)
            //get hashed log id
            let res = await request(server).get(route_logs)
            const lid = res.body[0].lid

            res = await request(server).delete(`${route_logs}/${lid}`)
            expect(res.status).toBe(200)
        })
        it('should remove log from db', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)
            //add log
            const log1 = {lid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            const log2 = {lid: '2', username: 'gordon', exercise: 'backflip', weight: '3000'}
            await request(server).post(route_logs).send(log1)
            await request(server).post(route_logs).send(log2)
            //get hashed log id
            let res = await request(server).get(route_logs)
            const lid = res.body[0].lid

            await request(server).delete(`${route_logs}/${lid}`)
            res = await request(server).get(route_logs)
            expect(res.body).toHaveLength(1)
        })
    })
})
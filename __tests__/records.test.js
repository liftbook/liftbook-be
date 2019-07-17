// ______    _______  _______  _______  ______    ______     _______  _______  _______  _______  _______ 
//|    _ |  |       ||       ||       ||    _ |  |      |   |       ||       ||       ||       ||       |
//|   | ||  |    ___||       ||   _   ||   | ||  |  _    |  |_     _||    ___||  _____||_     _||  _____|
//|   |_||_ |   |___ |       ||  | |  ||   |_||_ | | |   |    |   |  |   |___ | |_____   |   |  | |_____ 
//|    __  ||    ___||      _||  |_|  ||    __  || |_|   |    |   |  |    ___||_____  |  |   |  |_____  |
//|   |  | ||   |___ |     |_ |       ||   |  | ||       |    |   |  |   |___  _____| |  |   |   _____| |
//|___|  |_||_______||_______||_______||___|  |_||______|     |___|  |_______||_______|  |___|  |_______|

//IMPORTS
const request = require('supertest')
const server = require('../api/server')
const db = require('../data/config')

//ROUTES
const route_records = '/api/records'
const route_users = '/api/users'
const route_register = route_users + '/register'
const route_exercises = '/api/exercises'

//TESTS
describe('records', () => {
    describe('add', () => {
        afterEach(async () => await db('records').truncate())

        it('should receive status 201', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)

            const record = {rid: '1', username: 'gordon', exercise: 'backflip'}
            const res = await request(server).post(route_records).send(record)
            expect(res.status).toBe(201)
        })
        it('should receive record back', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)

            const record = {rid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            const res = await request(server).post(route_records).send(record)
            expect(res.body.weight).toBe('3000')
        })
        it('should receive status 500 with missing fields', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)

            const record = {rid: '1', username: 'gordon', weight: '3000'}
            const res = await request(server).post(route_records).send(record)
            expect(res.status).toBe(612)
        })
    })
    describe('get', () => {
        afterEach(async () => await db('records').truncate())

        it('should receive status 200', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)
            //add record
            const record = {rid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            await request(server).post(route_records).send(record)

            const res = await request(server).get(route_records)
            expect(res.status).toBe(200)
        })
        it('should receive array of records', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)
            //add record
            const record = {rid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            await request(server).post(route_records).send(record)

            const res = await request(server).get(route_records)
            expect(res.body).toHaveLength(1)
        })
        it('should receive array of user records', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)
            //add record
            const record = {rid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            await request(server).post(route_records).send(record)

            res = await request(server).get(`${route_records}/${user.username}`)
            expect(res.body).toHaveLength(1)
        })
        it('should receive array of user records for exercise', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)
            //add record
            const record = {rid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            await request(server).post(route_records).send(record)

            res = await request(server).get(`${route_records}/${user.username}/${exercise.name}`)
            expect(res.body).toHaveLength(1)
        })
    })
    describe('update', () => {
        afterEach(async () => await db('records').truncate())
        it('should receive status 201', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)
            //add record
            const record = {rid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            await request(server).post(route_records).send(record)
            //get hashed record id
            let res = await request(server).get(route_records)
            const rid = res.body[0].rid

            const update = {weight: '10000'}
            res = await request(server).put(`${route_records}/${rid}`).send(update)
            expect(res.status).toBe(200)
        })
        it('should return updated object', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)
            //add record
            const record = {rid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            await request(server).post(route_records).send(record)
            //get hashed record id
            let res = await request(server).get(route_records)
            const rid = res.body[0].rid

            const update = {weight: '10000'}
            res = await request(server).put(`${route_records}/${rid}`).send(update)
            expect(res.body.weight).toBe('10000')
        })
    })
    describe('remove', () => {
        afterEach(async () => await db('records').truncate())
        it('should return status 200', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)
            //add record
            const record = {rid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            await request(server).post(route_records).send(record)
            //get hashed record id
            let res = await request(server).get(route_records)
            const rid = res.body[0].rid

            res = await request(server).delete(`${route_records}/${rid}`)
            expect(res.status).toBe(200)
        })
        it('should remove record from db', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)
            //add record
            const record1 = {rid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            const record2 = {rid: '2', username: 'gordon', exercise: 'backflip', weight: '3000'}
            await request(server).post(route_records).send(record1)
            await request(server).post(route_records).send(record2)
            //get hashed record id
            let res = await request(server).get(route_records)
            const rid = res.body[0].rid

            await request(server).delete(`${route_records}/${rid}`)
            res = await request(server).get(route_records)
            expect(res.body).toHaveLength(1)
        })
    })
})
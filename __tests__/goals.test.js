// _______  _______  _______  ___        _______  _______  _______  _______  _______ 
//|       ||       ||   _   ||   |      |       ||       ||       ||       ||       |
//|    ___||   _   ||  |_|  ||   |      |_     _||    ___||  _____||_     _||  _____|
//|   | __ |  | |  ||       ||   |        |   |  |   |___ | |_____   |   |  | |_____ 
//|   ||  ||  |_|  ||       ||   |___     |   |  |    ___||_____  |  |   |  |_____  |
//|   |_| ||       ||   _   ||       |    |   |  |   |___  _____| |  |   |   _____| |
//|_______||_______||__| |__||_______|    |___|  |_______||_______|  |___|  |_______| 

//IMPORTS
const request = require('supertest')
const server = require('../api/server')
const db = require('../data/config')

//ROUTES
const route_goals = '/api/goals'
const route_users = '/api/users'
const route_register = route_users + '/register'
const route_exercises = '/api/exercises'

//TESTS
describe('egoalss', () => {
    describe('add', () => {
        afterEach(async () => await db('goals').truncate())

        it('should receive status 201', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)

            const goal = {gid: '1', username: 'gordon', exercise: 'backflip'}
            const res = await request(server).post(route_goals).send(goal)
            expect(res.status).toBe(201)
        })
        it('should receive goal back', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)

            const goal = {gid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            const res = await request(server).post(route_goals).send(goal)
            expect(res.body.weight).toBe('3000')
        })
        it('should receive status 500 with missing fields', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)

            const goal = {gid: '1', username: 'gordon', weight: '3000'}
            const res = await request(server).post(route_goals).send(goal)
            expect(res.status).toBe(612)
        })
    })
    describe('get', () => {
        afterEach(async () => await db('goals').truncate())

        it('should receive status 200', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)
            //add goal
            const goal = {gid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            await request(server).post(route_goals).send(goal)

            const res = await request(server).get(route_goals)
            expect(res.status).toBe(200)
        })
        it('should receive array of goals', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)
            //add goal
            const goal = {gid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            await request(server).post(route_goals).send(goal)

            const res = await request(server).get(route_goals)
            expect(res.body).toHaveLength(1)
        })
        it('should receive requested goal', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)
            //add goal
            const goal = {gid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            await request(server).post(route_goals).send(goal)
            //get hashed goal id
            let res = await request(server).get(route_goals)
            const gid = res.body[0].gid

            res = await request(server).get(`${route_goals}/${gid}`)
            expect(res.body.weight).toBe('3000')
        })
    })
    describe('update', () => {
        afterEach(async () => await db('goals').truncate())
        it('should receive status 201', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)
            //add goal
            const goal = {gid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            await request(server).post(route_goals).send(goal)
            //get hashed goal id
            let res = await request(server).get(route_goals)
            const gid = res.body[0].gid

            const update = {weight: '10000'}
            res = await request(server).put(`${route_goals}/${gid}`).send(update)
            expect(res.status).toBe(200)
        })
        it('should return updated object', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)
            //add goal
            const goal = {gid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            await request(server).post(route_goals).send(goal)
            //get hashed goal id
            let res = await request(server).get(route_goals)
            const gid = res.body[0].gid

            const update = {weight: '10000'}
            res = await request(server).put(`${route_goals}/${gid}`).send(update)
            expect(res.body.weight).toBe('10000')
        })
    })
    describe('remove', () => {
        afterEach(async () => await db('goals').truncate())
        it('should return status 200', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)
            //add goal
            const goal = {gid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            await request(server).post(route_goals).send(goal)
            //get hashed goal id
            let res = await request(server).get(route_goals)
            const gid = res.body[0].gid

            res = await request(server).delete(`${route_goals}/${gid}`)
            expect(res.status).toBe(200)
        })
        it('should remove goal from db', async () => {
            //add user
            const user = {uid: '1', username: 'gordon', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)
            //add exercise
            const exercise = {eid: '1', name: 'backflip', username: 'gordon', description: 'nope'}
            await request(server).post(route_exercises).send(exercise)
            //add goal
            const goal1 = {gid: '1', username: 'gordon', exercise: 'backflip', weight: '3000'}
            const goal2 = {gid: '2', username: 'gordon', exercise: 'backflip', weight: '3000'}
            await request(server).post(route_goals).send(goal1)
            await request(server).post(route_goals).send(goal2)
            //get hashed goal id
            let res = await request(server).get(route_goals)
            const gid = res.body[0].gid

            await request(server).delete(`${route_goals}/${gid}`)
            res = await request(server).get(route_goals)
            expect(res.body).toHaveLength(1)
        })
    })
})
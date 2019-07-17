// __   __  _______  _______  ______      _______  _______  _______  _______  _______ 
//|  | |  ||       ||       ||    _ |    |       ||       ||       ||       ||       |
//|  | |  ||  _____||    ___||   | ||    |_     _||    ___||  _____||_     _||  _____|
//|  |_|  || |_____ |   |___ |   |_||_     |   |  |   |___ | |_____   |   |  | |_____ 
//|       ||_____  ||    ___||    __  |    |   |  |    ___||_____  |  |   |  |_____  |
//|       | _____| ||   |___ |   |  | |    |   |  |   |___  _____| |  |   |   _____| |
//|_______||_______||_______||___|  |_|    |___|  |_______||_______|  |___|  |_______|

//IMPORTS
const request = require('supertest')
const server = require('../api/server')
const db = require('../data/config')

//ROUTES
const route_users = '/api/users'
const route_register = route_users + '/register'
const route_login = route_users + '/login'

//TESTS
xdescribe('users', () => {
    describe('register', () => {
        afterEach(async () => await db('users').truncate())

        it('should receive status 201', async () => {
            const user = {uid: '1', username: 'baconator', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            const res = await request(server).post(route_register).send(user)
            expect(res.status).toBe(201)
        })
        it('should receive added user', async () => {
            const user = {uid: '1', username: 'baconator', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            const res = await request(server).post(route_register).send(user)
            expect(res.body.username).toBe('baconator')
        })
        it('should receive status 500 with missing fields', async () => {
            const user = {uid: '1', username: 'mario', password: 'is missing'}
            const res = await request(server).post(route_register).send(user)
            expect(res.status).toBe(500)
        })
    })
    describe('login', () => {
        afterEach(async () => await db('users').truncate())

        it('should receive status 201', async () => {
            //add user
            const user = {uid: '1', username: 'baconator', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)

            const creds = {username: 'baconator', password: 'bacon'}
            const res = await request(server).post(route_login).send(creds)
            expect(res.status).toBe(201)
        })
        it('should receive token', async () => {
            //add user
            const user = {uid: '1', username: 'baconator', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)

            const creds = {uid: '1', username: 'baconator', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            const res = await request(server).post(route_login).send(creds)
            expect(res.body).toHaveProperty('token')
        })
        it('should receive status 404 with wrong credientials', async () => {
            //add user
            const user = {uid: '1', username: 'baconator', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)

            const creds = {uid: '1', username: 'mario', password: 'is missing'}
            const res = await request(server).post(route_login).send(creds)
            expect(res.status).toBe(404)
        })
    })
    describe('get', () => {
        afterEach(async () => await db('users').truncate())

        it('should receive status 200', async () => {
            //add user
            const user = {uid: '1', username: 'baconator', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)

            const res = await request(server).get(route_users)
            expect(res.status).toBe(200)
        })
        it('should receive array of users', async () => {
            //add user
            const user1 = {uid: '1', username: 'baconator', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            const user2 = {uid: '2', username: 'baconatron', password: 'bacon', email: 'bacon@kevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user1)
            await request(server).post(route_register).send(user2)

            const res = await request(server).get(route_users)
            expect(res.body).toHaveLength(2)
        })
        it('should receive specified user', async () => {
            //add user
            const user = {uid: '1', username: 'baconator', password: 'bacon', email: 'kacon@bevin', first_name: 'kevin', last_name: 'bacon'}
            await request(server).post(route_register).send(user)

            const res = await request(server).get(`${route_users}/baconator`)
            expect(res.body.username).toBe('baconator')
        })
    })
})
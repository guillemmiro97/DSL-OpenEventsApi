const express = require("express")
const router = express.Router()

const FriendsDAO = require("../DAO/FriendsDAO");
const fdao = new FriendsDAO()

const UsersDAO = require("../DAO/UsersDAO");
const udao = new UsersDAO()

//Gets all external users that are friends with the authenticated user
router.get("/", async (req, res, next) => {
    let decoded = await fdao.checkToken(req)
    if (decoded) {
        let results = await fdao.getFriendRequests(decoded.id, 1)
        let users = []
        if (results[0]) {
            for (let i = 0; i < results.length; i++) {
                let user = await udao.get(results[i].user_id)
                users.push(user)
            }
        }
        res.send(users)
    } else {
        res.sendStatus(401)
    }
})

//Gets all external users that have sent a friendship request to the authenticated user
router.get("/requests/", async (req, res, next) => {
    let decoded = await fdao.checkToken(req)
    if (decoded) {
        let results = await fdao.getFriendRequests(decoded.id, 0)
        let users = []
        if (results[0]) {
            for (let i = 0; i < results.length; i++) {
                let user = await udao.get(results[i].user_id)
                users.push(user)
            }
        }
        res.send(users)
    } else {
        res.sendStatus(401)
    }
})

//Creates friendship request to external user with match id from authenticated user
router.post("/:id/", async (req, res, next) => {
    let decoded = await fdao.checkToken(req)
    if (decoded) {
        if (await udao.get(req.params.id)) {
            res.status(201).send(await fdao.postFriendRequest(decoded.id, req.params.id))
        } else {
            res.status(400).send("User not found")
        }
    } else {
        res.sendStatus(401)
    }
})

//Accepts friendship request from external user to authenticated user
router.put("/:id/", async (req, res, next) => {
    let decoded = await fdao.checkToken(req)
    if (decoded) {
        if (await udao.get(req.params.id)) {
            res.status(201).send(await fdao.updateFriendRequest(decoded.id, req.params.id))
        } else {
            res.status(400).send("User not found")
        }
    } else {
        res.sendStatus(401)
    }
})

//Rejects friendship request from external user to authenticated user
router.delete("/:id/", async (req, res, next) => {
    if (await fdao.checkToken(req)) {
        if (await udao.get(req.params.id)) {
            res.status(201).send(await fdao.deleteFriendRequest(req.params.id))
        } else {
            res.status(400).send("User not found")
        }
    } else {
        res.sendStatus(401)
    }
})

module.exports = router;
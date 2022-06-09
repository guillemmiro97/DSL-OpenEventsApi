const express = require("express")
const router = express.Router()

const UsersDAO = require("../DAO/UsersDAO");
const udao = new UsersDAO()

const EventsDAO = require("../DAO/EventsDAO");
const edao = new EventsDAO()

//register
router.post("/", async(req, res, next) => {
    console.log(req.body)
    await udao.insertUser(req.body.name, req.body.last_name, req.body.email, req.body.password, req.body.image)
    res.status(201).json({
        "name": req.body.name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "image": req.body.image
    })
})

//login
router.post("/login", async(req, res, next) => {
    const { email, password } = req.body;
    const users = await udao.getAll();
    const user = users.find(u => u.email === email && u.password === password);

    console.log(user);

    if (user) {
        if (user.password === password) {
            const jwt = require('jsonwebtoken');
            const token = jwt.sign({ id: user.id, name: user.name, password: user.password }, process.env.JWT_KEY);

            res.status(200).json({
                accessToken: token
            });
        }
    } else {
        res.status(401).send("Incorrect username or password!")
    }
})

//get all users
router.get("/", async(req, res, next) => {
    if (await udao.checkToken(req)) {
        res.status(200).send(await udao.getAll())
    } else {
        res.sendStatus(401)
    }
})

//get users by string
router.get("/search", async(req, res, next) => {
    if (await udao.checkToken(req)) {
        res.status(200).send(await udao.getUserByString(req.query.s))
    } else {
        res.sendStatus(401)
    }
})

//get user by id
router.get("/:id", async(req, res, next) => {
    if (await udao.checkToken(req)) {
        res.status(200).send(await udao.get(req.params.id))
    } else {
        res.sendStatus(401)
    }
})

//get user statisticts by id
router.get("/:id/statistics", async(req, res, next) => {
    if (await udao.checkToken(req)) {
        res.status(200).send(await udao.getUserStatistics(req.params.id))
    } else {
        res.sendStatus(401)
    }
})

//edit specified fields of the authenticated user
router.put("/", async(req, res, next) => {
    const decoded = await udao.checkToken(req)
    if (decoded) {
        let user = await udao.get(decoded.id)
        user = user[0]

        if (req.body.name) user.name = req.body.name
        if (req.body.last_name) user.last_name = req.body.last_name
        if (req.body.email) user.email = req.body.email
        if (req.body.password) user.password = req.body.password
        if (req.body.image) user.image = req.body.image

        res.status(204).send(await udao.updateUser(user.id, user.name, user.last_name, user.email, user.password, user.image))
    } else {
        res.sendStatus(401)
    }
})

//delete authenticated user
router.delete("/", async(req, res, next) => {
    const decoded = await udao.checkToken(req)
    if (decoded) {
        res.status(204).send(await udao.delete(decoded.id))
    } else {
        res.sendStatus(401)
    }
})

//USERS - EVENTS

//get the events created by the user
router.get("/:id/events", async(req, res, next) => {
    if (await udao.checkToken(req)) {
        res.status(200).send(await edao.getEventsByUserId(req.params.id, ""))
    } else {
        res.sendStatus(401)
    }
})

//get user future events by id
router.get("/:id/events/future", async(req, res, next) => {
    if (await udao.checkToken(req)) {
        res.status(200).send(await edao.getEventsByUserId(req.params.id, "future"))
    } else {
        res.sendStatus(401)
    }
})

//get user finished events by id
router.get("/:id/events/finished", async(req, res, next) => {
    if (await udao.checkToken(req)) {
        res.status(200).send(await edao.getEventsByUserId(req.params.id, "finished"))
    } else {
        res.sendStatus(401)
    }
})

//get user current events by id
router.get("/:id/events/current", async(req, res, next) => {
    if (await udao.checkToken(req)) {
        res.status(200).send(await edao.getEventsByUserId(req.params.id, "current"))
    } else {
        res.sendStatus(401)
    }
})

//get user assistance's by id
router.get("/:id/assistances", async(req, res, next) => {
    if (await udao.checkToken(req)) {
        res.status(200).send(await udao.getUserAsistancesById(req.params.id, "all"))
    } else {
        res.sendStatus(401)
    }
})

//get user future assistance's by id
router.get("/:id/assistances/future", async(req, res, next) => {
    if (await udao.checkToken(req)) {
        res.status(200).send(await udao.getUserAsistancesById(req.params.id, "future"))
    } else {
        res.sendStatus(401)
    }
})

//get user finished assistance's by id
router.get("/:id/assistances/finished", async(req, res, next) => {
    if (await udao.checkToken(req)) {
        res.status(200).send(await udao.getUserAsistancesById(req.params.id, "finished"))
    } else {
        res.sendStatus(401)
    }
})

//get user friends by id
router.get("/:id/friends", async(req, res, next) => {
    if (await udao.checkToken(req)) {
        res.status(200).send(await udao.getUserFriends(req.params.id))
    } else {
        res.sendStatus(401)
    }

})

module.exports = router;
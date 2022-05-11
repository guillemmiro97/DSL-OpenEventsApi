const express = require("express")
const router = express.Router()

const UsersDAO = require("../DAO/UsersDAO");
const udao = new UsersDAO()

//register
router.post("/", async (req, res, next) => {
    console.log(req.body)
    await udao.insertUser(req.body.name, req.body.last_name, req.body.email, req.body.password, req.body.image)
    res.json({
        "name": req.body.name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "image": req.body.image
    })
})

//login
router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    const users = await udao.getAll();
    const user = users.find(u => u.email === email && u.password === password);

    console.log(user);

    if (user) {
        if (user.password === password) {
            const jwt = require('jsonwebtoken');
            const token = jwt.sign({id: user.id, nombre: user.nombre, password: user.password}, process.env.JWT_KEY);

            res.json({
                accessToken: token
            });
        }
    } else {
        res.status(401).send("Incorrect username or password!")
    }
})

//get all users
router.get("/", async (req, res, next)  => {
    if (await udao.checkToken(req)) {
        res.send(await udao.getAll())
    } else {
        res.sendStatus(401)
    }
})

//get user by id
router.get("/:id", async (req, res, next) => {
    if (await udao.checkToken(req)) {
        res.send(await udao.get(req.params.id))
    } else {
        res.sendStatus(401)
    }
})

//get users by string
router.get("/search", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//get user statisticts by id
router.get("/:id/statistics", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//edit specified fields of the authenticated user
router.put("/", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//delete authenticated user
router.delete("/", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//USERS - EVENTS

//get user events by id
router.get("/:id/events", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//get user future events by id
router.get("/:id/events/future", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//get user finished events by id
router.get("/:id/events/finished", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//get user current events by id
router.get("/:id/events/current", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//get user assistance's by id
router.get("/:id/assistances", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//get user future assistance's by id
router.get("/:id/assistances/future", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//get user finished assistance's by id
router.get("/:id/assistances/finished", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//get user friends by id
router.get("/:id/friends", async (req, res, next) => {
    res.send("Waiting for implementation")
})

module.exports = router;
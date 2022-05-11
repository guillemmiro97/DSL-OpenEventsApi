const express = require("express")
const router = express.Router()

const UsersDAO = require("../DAO/UsersDAO");
const udao = new UsersDAO()

//register
router.post("/", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//login
router.post("/login", async (req, res, next) => {
    /*const {nombre, password} = req.body;
    const users = await udao.getAll();

    const user = users.find(u => u.nombre === nombre && u.password === password);
    console.log(user);

    if (user) {
        if (user.password === password) {
            const jwt = require('jsonwebtoken');
            const token = jwt.sign({id: user.id, nombre: user.nombre, password: user.password}, process.env.JWT_KEY);

            res.json({
                token: token
            });
        }
    } else {
        res.status(401).send("Incorrect username or password!")
    }*/
    res.send("Waiting for implementation")
})

//get all users
router.get("/", async (req, res, next)  => {
    res.send("Waiting for implementation")
})

//get user by id
router.get("/:id", async (req, res, next) => {
    res.send("Waiting for implementation")
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
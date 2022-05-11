const express = require("express")
const router = express.Router()

const MessagesDAO = require("../DAO/MessagesDAO");
const mdao = new MessagesDAO()

//Creates message
router.post("/", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//Gets all external users that are messaging the authenticated user
router.get("/users/", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//Gets all messages between the external user with matching id and the authenticated user
router.get("/:id/", async (req, res, next) => {
    res.send("Waiting for implementation")
})

module.exports = router;
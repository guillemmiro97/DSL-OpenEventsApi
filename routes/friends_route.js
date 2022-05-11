const express = require("express")
const router = express.Router()

const FriendsDAO = require("../DAO/FriendsDAO");
const fdao = new FriendsDAO()

//Gets all external users that are friends with the authenticated user
router.get("/", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//Gets all external users that have sent a friendship request to the authenticated user
router.get("/requests/", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//Creates friendship request to external user with match id from authenticated user
router.post("/:id/", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//Accepts friendship request from external user to authenticated user
router.put("/:id/", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//Rejects friendship request from external user to authenticated user
router.delete("/:id/", async (req, res, next) => {
    res.send("Waiting for implementation")
})

module.exports = router;
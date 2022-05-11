const express = require("express")
const router = express.Router()

const EventsDAO = require("../DAO/EventsDAO")
const edao = new EventsDAO()

//create event
router.post("/", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//get all future events
router.get("/", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//get event by id
router.get("/:id", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//Gets all future events in descending order based on the average score of the creator's old events.
router.get("/best", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//Searches events with location, keyword in name, or date containing or matching the values of the query parameters.
router.get("/search", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//Edits specified fields of the event with matching id
router.put("/:id", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//Deletes event with matching id
router.delete("/:id", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//Gets all assistances for event with matching id
router.get("/:id/assistances", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//Gets assistance of user with matching id for event with matching id
router.get("/:event_id/assistances/:user_id", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//Creates assistance of authenticated user for event with matching id
router.post("/:id/assistances/", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//Edits assistance of authenticated user for the event with matching id
router.put("/:id/assistances", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//Deletes assistance of authenticated user for event with matching id
router.delete("/:id/assistances", async (req, res, next) => {
    res.send("Waiting for implementation")
})

module.exports = router;
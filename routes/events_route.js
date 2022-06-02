const express = require("express")
const router = express.Router()

const EventsDAO = require("../DAO/EventsDAO")
const edao = new EventsDAO()

//create event
router.post("/", async(req, res, next) => {
    if (await edao.checkToken(req)) {
        let event = req.body
            //validation of the event
        if (Object.keys(event).length < 10) {
            res.status(400).send("Invalid event")
        } else {
            let result = await edao.insertEvent(event)
            if (result.affectedRows === 1) {
                res.status(201).send(event)
            } else {
                res.status(400).send("Event not created")
            }
        }
    } else {
        res.sendStatus(401)
    }
})

//get all future events
router.get("/", async(req, res, next) => {
    if (await edao.checkToken(req)) {
        res.status(200).send(await edao.getFutureEvents())
    } else {
        res.sendStatus(401)
    }
})

//Gets all future events in descending order based on the average score of the creator's old events.
router.get("/best", async(req, res, next) => {
    res.send("Waiting for implementation")
})

//Searches events with location, keyword in name, or date containing or matching the values of the query parameters.
router.get("/search", async(req, res, next) => {
    if (await edao.checkToken(req)) {
        res.status(200).send(await edao.getEventByString(req.query.location, req.query.keyword, req.query.date))
    } else {
        res.sendStatus(401)
    }
})

//get event by id
router.get("/:id", async(req, res, next) => {
    if (await edao.checkToken(req)) {
        res.status(200).send(await edao.get(req.params.id))
    } else {
        res.sendStatus(401)
    }
})

//Edits specified fields of the event with matching id
router.put("/:id", async(req, res, next) => {
    if (await edao.checkToken(req)) {
        let event = await edao.get(req.params.id)
        event = event[0]
        let newEvent = req.body

        if (req.body.name) event.name = newEvent.name
        if (req.body.date) event.date = newEvent.date
        if (req.body.image) event.image = newEvent.image
        if (req.body.location) event.location = newEvent.location
        if (req.body.description) event.description = newEvent.description
        if (req.body.eventStart_date) event.eventStart_date = newEvent.eventStart_date
        if (req.body.eventEnd_date) event.eventEnd_date = newEvent.eventEnd_date
        if (req.body.n_participators) event.n_participators = newEvent.n_participators
        if (req.body.type) event.type = newEvent.type

        let result = await edao.updateEvent(event)
        console.log(result)

        if (result.affectedRows > 0) {
            res.status(200).send(event)
        } else {
            res.status(400).send("Event not updated")
        }
    } else {
        res.sendStatus(401)
    }
})

//Deletes event with matching id
router.delete("/:id", async(req, res, next) => {
    if (await edao.checkToken(req)) {
        res.status(204).send(await edao.delete(req.params.id))
    } else {
        res.sendStatus(401)
    }
})

//Gets all assistances for event with matching id
router.get("/:id/assistances", async(req, res, next) => {
    res.send("Waiting for implementation")
})

//Gets assistance of user with matching id for event with matching id
router.get("/:event_id/assistances/:user_id", async(req, res, next) => {
    res.send("Waiting for implementation")
})

//Creates assistance of authenticated user for event with matching id
router.post("/:id/assistances/", async(req, res, next) => {
    let decoded = await edao.checkToken(req)
    if (decoded) {
        let result = await edao.assistEvent(req.params.id, decoded.id)
        res.status(201).send(result)
    } else {
        res.sendStatus(401)
    }
})

//Edits assistance of authenticated user for the event with matching id
router.put("/:id/assistances", async(req, res, next) => {
    res.send("Waiting for implementation")
})

//Deletes assistance of authenticated user for event with matching id
router.delete("/:id/assistances", async(req, res, next) => {
    res.send("Waiting for implementation")
})

module.exports = router;
const express = require("express")
const router = express.Router()

const AssistancesDAO = require("../DAO/AssistancesDAO");
const adao = new AssistancesDAO()
const UsersDAO = require("../DAO/UsersDAO");
const udao = new UsersDAO()
const EventsDAO = require("../DAO/EventsDAO");
const edao = new EventsDAO()

//Gets assistance of user with matching id for event with matching id
router.get("/:user_id/:event_id/", async (req, res, next) => {
    if (await adao.checkToken(req)) {
        if (await udao.get(req.params.user_id) && await edao.get(req.params.event_id)) {
            let results = await adao.getAssistances(req.params.user_id, req.params.event_id)
            res.status(200).send(results)
        } else {
            res.status(404).json({
                error: "User or event not found"
            })
        }
    } else {
        res.status(401)
    }
})

//Creates assistance of user with matching id for event with matching id
router.post("/:user_id/:event_id/", async (req, res, next) => {
    if (await adao.checkToken(req)) {
        if (await udao.get(req.params.user_id) && await edao.get(req.params.event_id)) {
            if (await adao.getAssistances(req.params.user_id, req.params.event_id) !== "No assistances found") {
                res.status(409).json({
                    error: "Assistance already exists"
                })
            } else {
                let result = await adao.assistEvent(req.params.user_id, req.params.event_id)
                if (result.affectedRows > 0) {
                    res.sendStatus(201)
                } else {
                    res.status(400).send("Assistance not created")
                }
            }
        } else {
            res.status(404).json({
                error: "User or event not found"
            })
        }

    } else {
        res.sendStatus(401)
    }
})

//Edits assistance of user with matching id for the event with matching id
router.put("/:user_id/:event_id/", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//Deletes assistance of user with matching id for the event with matching id
router.delete("/:user_id/:event_id/", async (req, res, next) => {
    if (await adao.checkToken(req)) {
        if (await udao.get(req.params.user_id) && await edao.get(req.params.event_id)) {
            let result = await adao.deleteAssistance(req.params.user_id, req.params.event_id)
            if (result.affectedRows > 0) {
                res.status(204).send(result)
            } else {
                res.status(404).json({
                    error: "Assistance not found"
                })
            }
        } else {
            res.status(404).json({
                error: "User or event not found"
            })
        }
    } else {
        res.sendStatus(401)
    }
})

module.exports = router;
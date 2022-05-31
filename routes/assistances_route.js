const express = require("express")
const router = express.Router()

const AssistancesDAO = require("../DAO/AssistancesDAO");
const adao = new AssistancesDAO()

//Gets assistance of user with matching id for event with matching id
router.get("/:user_id/:event_id/", async(req, res, next) => {
    if (await adao.checkToken(req)) {
        let results = await adao.getAssistances(req.params.user_id, req.params.event_id)
        res.status(200).send(results)

    } else {
        res.status(401)
    }
})

//Creates assistance of user with matching id for event with matching id
router.post("/:user_id/:event_id/", async(req, res, next) => {
    if (await adao.checkToken(req)) {
        let result = await adao.assistEvent(req.params.user_id, req.params.event_id)
        if (result.affectedRows > 0) {
            res.status(201).send(result)
        } else {
            res.status(400).send("Assistance not created")
        }
    } else {
        res.sendStatus(401)
    }
})

//Edits assistance of user with matching id for the event with matching id
router.put("/:user_id/:event_id/", async(req, res, next) => {
    res.send("Waiting for implementation")
})

//Deletes assistance of user with matching id for the event with matching id
router.delete("/:user_id/:event_id/", async(req, res, next) => {
    res.send("Waiting for implementation")
})

module.exports = router;
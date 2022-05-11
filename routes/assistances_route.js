const express = require("express")
const router = express.Router()

const AssistancesDAO = require("../DAO/AssistancesDAO");
const adao = new AssistancesDAO()

//Gets assistance of user with matching id for event with matching id
router.get("/:user_id/:event_id/", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//Creates assistance of user with matching id for event with matching id
router.post("/:user_id/:event_id/", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//Edits assistance of user with matching id for the event with matching id
router.put("/:user_id/:event_id/", async (req, res, next) => {
    res.send("Waiting for implementation")
})

//Deletes assistance of user with matching id for the event with matching id
router.delete("/:user_id/:event_id/", async (req, res, next) => {
    res.send("Waiting for implementation")
})

module.exports = router;
const express = require("express")
const router = express.Router()

const MessagesDAO = require("../DAO/MessagesDAO");
const mdao = new MessagesDAO()

const UsersDAO = require("../DAO/UsersDAO")
const udao = new UsersDAO()

//Creates message
router.post("/", async (req, res, next) => {
    if (await mdao.checkToken(req)) {
        if ((await udao.get(req.body.user_id_send)).length > 0 && (await udao.get(req.body.user_id_recived)).length > 0) {
            let message = req.body
            res.status(201).send(await mdao.insertMessage(message))
        } else {
            res.status(404).json({
                message: "User not found"
            })
        }
    } else {
        res.sendStatus(401)
    }
})

//Gets all external users that are messaging the authenticated user
router.get("/users/", async (req, res, next) => {
    let decoded = await mdao.checkToken(req)
    if (decoded) {
        let messages = await mdao.getMessages(decoded.id)
        console.log(messages)

        //TODO: fix the error with "No messages for the user authinticated" lenght with null

        let users = []
        for (let i = 0; i < messages.length; i++) {
            if (messages[i].user_id_send !== decoded.id) {
                users.push((await udao.get(messages[i].user_id_send))[0])
            } else {
                users.push((await udao.get(messages[i].user_id_recived))[0])
            }
        }

        res.status(200).send(users)
    } else {
        res.sendStatus(401)
    }
})

//Gets all messages between the external user with matching id and the authenticated user
router.get("/:id/", async (req, res, next) => {
    if (await mdao.checkToken(req)) {
        res.status(200).send(await mdao.getMessages(req.params.id))
    } else {
        res.sendStatus(401)
    }
})

router.delete("/:id/", async (req, res, next) => {
    if (await mdao.checkToken(req)) {
        res.status(200).send(await mdao.delete(req.params.id))
    } else {
        res.sendStatus(401)
    }
})

module.exports = router;
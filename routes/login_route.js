const express = require("express")
const router = express.Router()

const UsersDAO = require("../DAO/UsersDAO");
const udao = new UsersDAO()

router.get("/", (req, res) => {
    res.send("Make a post request with the following body: {nombre: 'asdf', password: 'asdf'}")
})

router.post("/", async (req, res, next) => {
    const { nombre, password } = req.body;
    const users = await udao.getAll();

    const user = users.find(u => u.nombre === nombre && u.password === password);
    console.log(user);

    if (user) {
        if (user.password === password) {
            const jwt = require('jsonwebtoken');
            const token = jwt.sign({ id: user.id, nombre: user.nombre, password: user.password }, process.env.JWT_KEY);

            res.json({
                token: token
            });
        }
    } else {
        res.status(401).send("Incorrect username or password!")
    }
})

module.exports = router;
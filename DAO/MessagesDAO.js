const GenericDAO = require("./generic.dao")

class MessagesDAO extends GenericDAO {

    constructor() {
        super("message")
    }


    async insertMessage(message) {
        this._message = message

        /*`id` int(11) NOT NULL,
        `content` varchar(45) NOT NULL,
        `user_id_send` int(11) NOT NULL,
        `user_id_recived` int(11) NOT NULL,
        `timeStamp` datetime NOT NULL*/

        const [results] = await global.connection.promise()
            .query("INSERT INTO ?? (content, user_id_send, user_id_recived, timeStamp) VALUES (?, ?, ?, ?)", [this.tabla, this._message.content, this._message.user_id_send, this._message.user_id_recived, new Date()])


        if (results.affectedRows > 0) {
            let lastMessage = await this.getLastMessage()
            return lastMessage;
        }
    }

    async getLastMessage() {
        const query = `SELECT * FROM ?? ORDER BY timeStamp DESC LIMIT 1`

        const [results] = await global.connection.promise().query(query, [this.tabla])

        return results
    }

    async getMessages(id) {
        const query = `SELECT * FROM ?? WHERE user_id_send = ? OR user_id_recived = ? ORDER BY timeStamp DESC`

        const [results] = await global.connection.promise().query(query, [this.tabla, id, id])

        if (results.length > 0) {
            return results
        } else {
            return "No messages for the user authinticated"
        }

    }



}

module.exports = MessagesDAO
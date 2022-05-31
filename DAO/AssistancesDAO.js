const GenericDAO = require("./generic.dao")

class AssistancesDAO extends GenericDAO {

    constructor() {
        super("assistance")
    }

    async assistEvent(user_id, event_id) {
        this._user_id = user_id
        this._event_id = event_id

        const [results] = await global.connection.promise()
            .query("INSERT INTO ?? (user_id, event_id) VALUES (?, ?)", [this.tabla, this._user_id, this._event_id])

        return results
    }

    async getAssistances(user_id, event_id) {
        this._event_id = event_id
        this._user_id = user_id

        const [results] = await global.connection.promise()
            .query("SELECT * FROM ?? WHERE event_id = ? AND user_id = ?", [this.tabla, this._event_id, this._user_id])

        if (results.length > 0) {
            return results
        } else {
            return "No assistances found"
        }
    }

    async deleteAssistance (user_id, event_id) {
        this._event_id = event_id
        this._user_id = user_id

        const [results] = await global.connection.promise()
            .query("DELETE FROM ?? WHERE event_id = ? AND user_id = ?", [this.tabla, this._event_id, this._user_id])

        return results
    }
}

module.exports = AssistancesDAO
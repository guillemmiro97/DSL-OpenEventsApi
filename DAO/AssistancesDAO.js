const GenericDAO = require("./generic.dao")

class AssistancesDAO extends GenericDAO {

    constructor() {
        super("assistance")
    }

    /**
     * 
     * @param {*} user_id 
     * @param {*} event_id 
     * @returns assit event result
     */
    async assistEvent(user_id, event_id) {
        this._user_id = user_id
        this._event_id = event_id

        const [results] = await global.connection.promise()
            .query("INSERT INTO ?? (user_id, event_id) VALUES (?, ?)", [this.tabla, this._user_id, this._event_id])

        return results
    }

    /**
     * 
     * @param {*} user_id 
     * @param {*} event_id 
     * @returns get assistances by  comobination of event and user id
     */
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

    /**
     * 
     * @param {*} user_id 
     * @param {*} event_id 
     * @param {*} puntuation 
     * @param {*} comentary 
     * @returns update assistances by comobination of event and user id
     */
    async editAssistance(user_id, event_id, puntuation, comentary) {
        this._user_id = user_id
        this._event_id = event_id
        this._puntuation = puntuation
        this._comentary = comentary

        let query = ""

        if (this._puntuation && this._comentary) {
            query = `UPDATE ?? SET comentary = "${this._comentary}", puntuation = ${this._puntuation} WHERE user_id = ? AND event_id = ?`
        } else if (this._puntuation) {
            query = `UPDATE ?? SET puntuation = ${this._puntuation} WHERE user_id = ? AND event_id = ?`
        } else if (this._comentary) {
            query = `UPDATE ?? SET comentary = "${this._comentary}" WHERE user_id = ? AND event_id = ?`
        }

        const [results] = await global.connection.promise()
            .query(query, [this.tabla, this._user_id, this._event_id])

        return results
    }

    /**
     * 
     * @param {*} user_id 
     * @param {*} event_id 
     * @returns delete assistances by comobination of event and user id
     */
    async deleteAssistance(user_id, event_id) {
        this._event_id = event_id
        this._user_id = user_id

        const [results] = await global.connection.promise()
            .query("DELETE FROM ?? WHERE event_id = ? AND user_id = ?", [this.tabla, this._event_id, this._user_id])

        return results
    }
}

module.exports = AssistancesDAO
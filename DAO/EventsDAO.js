const GenericDAO = require("./generic.dao")

class EventsDAO extends GenericDAO {

    constructor() {
        super("events")
    }

    /**
     * 
     * @param {*} event 
     * @returns event inserted
     */
    async insertEvent(event) {
        this._event = event

        const [results] = await global.connection.promise()
            .query("INSERT INTO ?? (name, image, location, description, eventStart_date, eventEnd_date, n_participators, type, owner_id, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [this.tabla, this._event.name, this._event.image,
                this._event.location, this._event.description,
                new Date(this._event.eventStart_date), new Date(this._event.eventEnd_date),
                parseInt(this._event.n_participators), this._event.type,
                parseInt(this._event.owner_id), new Date(this._event.date)
            ])

        return results;
    }

    /**
     * 
     * @param {*} id 
     * @param {*} type 
     * @returns list of events by user id
     */
    async getEventsByUserId(id, type) {
        this._id = id

        let query;

        if (type === "future") {
            query = "SELECT * FROM ?? WHERE owner_id = ? AND eventStart_date > NOW()"
        } else if (type === "finished") {
            query = "SELECT * FROM ?? WHERE owner_id = ? AND eventEnd_date < NOW()"
        } else if (type === "current") {
            query = "SELECT * FROM ?? WHERE owner_id = ? AND eventStart_date > NOW() AND eventEnd_date < NOW()"
        } else {
            query = "SELECT * FROM ?? WHERE owner_id = ?"
        }

        const [results] = await global.connection.promise()
            .query(query, [this.tabla, this._id])

        return results;
    }


    /**
     * 
     * @returns list of future
     */
    async getFutureEvents() {
        const [results] = await global.connection.promise()
            .query("SELECT * FROM ?? WHERE eventStart_date > NOW()", [this.tabla])

        return results;
    }

    /**
     * 
     * @param {*} event 
     * @returns event updated result
     */

    async updateEvent(event) {
        this._event = event

        const [results] = await global.connection.promise()
            .query("UPDATE ?? SET name = ?, image = ?, location = ?, description = ?, eventStart_date = ?, eventEnd_date = ?, n_participators = ?, type = ?, date = ?", [this.tabla, this._event.name, this._event.image,
                this._event.location, this._event.description,
                new Date(this._event.eventStart_date), new Date(this._event.eventEnd_date),
                parseInt(this._event.n_participators), this._event.type, new Date(this._event.date)
            ])

        return results;
    }

    /**
     * 
     * @param {*} location 
     * @param {*} keyword 
     * @param {*} date 
     * @returns search event by parameter 
     */
    async getEventByString(location, keyword, date) {
        this._location = location
        this._keyword = keyword
        this._date = date
        let query = ""

        if (this._location) {
            if (this._keyword) {
                if (this._date) {
                    query = `SELECT * FROM ?? WHERE name LIKE '%${this._keyword}%' OR location LIKE '%${this._location}%' OR date LIKE '%${this._date}%'`
                } else {
                    query = `SELECT * FROM ?? WHERE name LIKE '%${this._keyword}%' OR location LIKE '%${this._location}%'`
                }
            } else {
                if (this._date) {
                    query = `SELECT * FROM ?? WHERE location LIKE '%${this._location}%' AND date LIKE '%${this._date}%'`
                } else {
                    query = `SELECT * FROM ?? WHERE location LIKE '%${this._location}%'`
                }
            }
        } else {
            if (this._keyword) {
                if (this._date) {
                    query = `SELECT * FROM ?? WHERE name LIKE '%${this._keyword}%' OR date LIKE '%${this._date}%'`
                } else {
                    query = `SELECT * FROM ?? WHERE name LIKE '%${this._keyword}%'`
                }
            } else {
                if (this._date) {
                    query = `SELECT * FROM ?? WHERE date LIKE '%${this._date}%'`
                } else {
                    query = `SELECT * FROM ?? WHERE name LIKE '%${this._keyword}%'`
                }
            }
        }

        const [results] = await global.connection.promise().query(query, [this.tabla])

        if (results.length > 0) {
            return results
        } else {
            return "No events found"
        }
    }

    /**
     * 
     * @param {*} eventId 
     * @param {*} userId 
     * @returns assist event result
     */
    async assistEvent(eventId, userId) {
        this._eventId = eventId
        this._userId = userId

        const [results] = await global.connection.promise()
            .query("INSERT INTO assistance (event_id, user_id) VALUES (?, ?)", [this._eventId, this._userId])

        return results;
    }

    /**
     * 
     * @param {*} eventId 
     * @param {*} userId 
     * @returns get assistances by  comobination of event and user id
     */
    async getAssistances(eventId, userId) {
        this._eventId = eventId
        this._userId = userId

        const [results] = await global.connection.promise()
            .query("SELECT * FROM assistance WHERE event_id = ? AND user_id = ?", [this._eventId, this._userId])

        if (results.length > 0) {
            return results
        } else {
            return "No assistances found"
        }
    }

    /**
     * 
     * @param {*} eventId 
     * @returns Get assistances by only event id. 
     */
    async getAssistancesByEventId(eventId) {
        this._eventId = eventId

        let queryUsers = "SELECT user_id FROM assistance WHERE event_id = ?"

        const [resultUsersAssitance] = await global.connection.promise()
            .query(queryUsers, [this._eventId])

        let results = []

        for (const user of resultUsersAssitance) {

            let queryUser = "SELECT * FROM users WHERE id = ?"
            const [resultUser] = await global.connection.promise().query(queryUser, [user.user_id])

            let queryAssitance = "SELECT * FROM assistance WHERE event_id = ? AND user_id = ?"
            const [resultAssistance] = await global.connection.promise().query(queryAssitance, [this._eventId, user.user_id])

            const responseUser = {
                id: resultUser[0].id,
                name: resultUser[0].name,
                last_name: resultUser[0].last_name,
                puntuation: resultAssistance[0].puntuation,
                comentary: resultAssistance[0].comentary
            }

            results.push(responseUser)
        }

        if (results.length > 0) {
            return results
        } else {
            return "No assistances found"
        }
    }

    /**
     * 
     * @param {*} eventId 
     * @param {*} userId 
     * @param {*} puntuation 
     * @param {*} comentary 
     * @returns update assistances by comobination of event and user id
     */
    async editAssistance(eventId, userId, puntuation, comentary) {

        this._eventId = eventId
        this._userId = userId
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


        if (results.affectedRows > 0) {
            return results
        } else {
            return "No assistances modified"
        }
    }

    /**
     * 
     * @param {*} eventId 
     * @param {*} userId 
     * @returns delete assistances by comobination of event and user id
     */
    async deleteAssistance(eventId, userId) {
        this._eventId = eventId
        this._userId = userId

        const [results] = await global.connection.promise()
            .query("DELETE FROM assistance WHERE event_id = ? AND user_id = ?", [this._eventId, this._userId])

        if (results.affectedRows > 0) {
            return results
        } else {
            return "No assistances deleted"
        }
    }
}

module.exports = EventsDAO
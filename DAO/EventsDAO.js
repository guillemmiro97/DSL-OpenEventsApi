const GenericDAO = require("./generic.dao")

class EventsDAO extends GenericDAO {

    constructor() {
        super("events")
    }

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

    async getFutureEvents() {
        const [results] = await global.connection.promise()
            .query("SELECT * FROM ?? WHERE eventStart_date > NOW()", [this.tabla])

        return results;
    }

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

    async assistEvent(eventId, userId) {
        this._eventId = eventId
        this._userId = userId

        const [results] = await global.connection.promise()
            .query("INSERT INTO assistance (event_id, user_id) VALUES (?, ?)", [this._eventId, this._userId])

        return results;
    }


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

        return results;
    }

    async editAssistance(eventId, userId, puntuation, comentary) {

        this._eventId = eventId
        this._userId = userId
        this._puntuation = puntuation
        this._comentary = comentary

        const [results] = await global.connection.promise()
            .query("UPDATE assistance SET puntuation = ?, comentary = ? WHERE event_id = ? AND user_id = ?", [this._puntuation, this._comentary, this._eventId, this._userId])

        if (results.affectedRows > 0) {
            return results
        } else {
            return "No assistances modified"
        }
    }
}

module.exports = EventsDAO
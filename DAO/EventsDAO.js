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
}

module.exports = EventsDAO
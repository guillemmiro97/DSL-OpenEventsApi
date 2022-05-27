const GenericDAO = require("./generic.dao")

class EventsDAO extends GenericDAO {

    constructor() {
        super("events")
    }

    async insertEvent(event) {
        this._event = event

        const [results] = await global.connection.promise()
            .query("INSERT INTO ?? (name, image, location, description, eventStart_date, eventEnd_date, n_participators, type, owner_id, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
                , [this.tabla, this._event.name, this._event.image,
                    this._event.location, this._event.description,
                    new Date(this._event.eventStart_date), new Date(this._event.eventEnd_date),
                    this._event.n_participators, this._event.type,
                    this._event.owner_id, new Date(this._event.date)])

        return results;
    }

}

module.exports = EventsDAO
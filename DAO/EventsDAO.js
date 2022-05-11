const GenericDAO = require("./generic.dao")

class EventsDAO extends GenericDAO{

    constructor(){
        super("user")
    }

}

module.exports = EventsDAO
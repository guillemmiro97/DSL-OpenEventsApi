const GenericDAO = require("./generic.dao")

class MessagesDAO extends GenericDAO{

    constructor(){
        super("user")
    }

}

module.exports = MessagesDAO
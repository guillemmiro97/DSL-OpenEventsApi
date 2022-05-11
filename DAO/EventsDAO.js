const GenericDAO = require("./generic.dao")

class UsersDAO extends GenericDAO{

    constructor(){
        super("user")
    }

}

module.exports = UsersDAO
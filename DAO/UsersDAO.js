const GenericDAO = require("./generic.dao")

class UsersDAO extends GenericDAO{

    constructor(){
        super("user")
    }

    async insertUser(name, password){
        this._name = name
        this._password = password
    }

    async updateUser(id, password){
        this._id = id
        this._password = password
    }

}

module.exports = UsersDAO
const GenericDAO = require("./generic.dao")

class UsersDAO extends GenericDAO{

    constructor(){
        super("users")
    }

    async insertUser(name, last_name, email, password, image){
        this._name = name
        this._last_name = last_name
        this._email = email
        this._password = password
        this._image = image

        const [results] = await global.connection.promise()
            .query("INSERT INTO ?? (name, last_name, email, password, image) VALUES (?, ?, ?, ?, ?)"
                , [this.tabla,this._name, this._last_name, this._email, this._password, this._image])

        return results;
    }

    async getUserByString (string) {
        this._string = string
        const query = `SELECT * FROM ?? WHERE name LIKE '%${this._string}%' OR last_name LIKE '%${this._string}%' OR email LIKE '%${this._string}%'`

        const [results] = await global.connection.promise().query(query, [this.tabla])

        console.log(results)

        return results
    }

    async updateUser(id, password){
        this._id = id
        this._password = password
    }

}

module.exports = UsersDAO
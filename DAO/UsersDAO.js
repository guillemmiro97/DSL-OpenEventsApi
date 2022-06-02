const GenericDAO = require("./generic.dao")

class UsersDAO extends GenericDAO {

    constructor() {
        super("users")
    }

    /**
     * 
     * @param {*} name 
     * @param {*} last_name 
     * @param {*} email 
     * @param {*} password 
     * @param {*} image 
     * @returns inserted user result
     */
    async insertUser(name, last_name, email, password, image) {
        this._name = name
        this._last_name = last_name
        this._email = email
        this._password = password
        this._image = image

        const [results] = await global.connection.promise()
            .query("INSERT INTO ?? (name, last_name, email, password, image) VALUES (?, ?, ?, ?, ?)", [this.tabla, this._name, this._last_name, this._email, this._password, this._image])

        return results;
    }

    /**
     * 
     * @param {*} string 
     * @returns get user by search string
     */
    async getUserByString(string) {
        this._string = string
        const query = `SELECT * FROM ?? WHERE name LIKE '%${this._string}%' OR last_name LIKE '%${this._string}%' OR email LIKE '%${this._string}%'`

        const [results] = await global.connection.promise().query(query, [this.tabla])

        console.log(results)

        return results
    }

    /**
     * 
     * @param {*} id 
     * @param {*} name 
     * @param {*} last_name 
     * @param {*} email 
     * @param {*} password 
     * @param {*} image 
     * @returns updated user result
     */
    async updateUser(id, name, last_name, email, password, image) {
        this._id = id
        this._name = name
        this._last_name = last_name
        this._email = email
        this._password = password
        this._image = image

        const [results] = await global.connection.promise()
            .query("UPDATE ?? SET name = ?, last_name = ?, email = ?, password = ?, image = ? WHERE id = ?", [this.tabla, this._name, this._last_name, this._email, this._password, this._image, this._id])

        return results;
    }

    /**
     * 
     * @param {*} id 
     * @param {*} mode 
     * @returns get user assistances by id and mode result 
     */

    async getUserAsistancesById(id, mode) {
        this._id = id
        let query = ""
        switch (mode) {
            case "future":
                query = `SELECT * FROM events WHERE id IN ( SELECT event_id FROM assistance WHERE user_id = ?) AND eventStart_date > NOW()`
                break;
            case "finished":
                query = `SELECT * FROM events WHERE id IN ( SELECT event_id FROM assistance WHERE user_id = ?) AND eventStart_date < NOW()`
                break;
            case "all":
                query = `SELECT * FROM events WHERE id IN ( SELECT event_id FROM assistance WHERE user_id = ?)`
                break;
            default:
                break;
        }

        const [results] = await global.connection.promise().query(query, [this._id])

        if (results.length > 0) {
            return results
        } else {
            return "No assistances found"
        }

    }



}

module.exports = UsersDAO
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

    /**
     * 
     * @param {*} id 
     * @returns get user statistics
     */
    async getUserStatistics(id) {
        this._id = id

        this._users = await this.getAll()

        let queryCommentsUserId = `SELECT COUNT(*) as user_coments , user_id FROM assistance WHERE user_id = ${this._id} AND comentary IS NOT NULL`
        const [resultsCommentsUserId] = await global.connection.promise().query(queryCommentsUserId, [this._id])
        let commentsUserID = resultsCommentsUserId[0]
        let numberOfCommentsLower = 0

        for (const user of this._users) {
            if (user.id !== this._id) {

                let letQueryComments = `SELECT COUNT(*) AS user_coments, user_id FROM assistance WHERE user_id = ${user.id} AND comentary IS NOT NULL`
                const [resultsComments] = await global.connection.promise().query(letQueryComments)
                let comments = resultsComments[0]

                if (commentsUserID.user_coments > comments.user_coments) {
                    numberOfCommentsLower++
                }

            }
        }

        let percentage_below = (numberOfCommentsLower * 100) / this._users.length

        let query = `SELECT COUNT(*) AS num_coments, AVG(puntuation) AS avg_score FROM assistance WHERE user_id = ?`
        const [results] = await global.connection.promise().query(query, [this._id])

        results[0].num_of_commenters_below = percentage_below


        if (results.length > 0) {
            return results
        } else {
            return "No statistics found"
        }

    }

    async getUserFriends(id) {
        this._id = id

        //He probado a cambiar el status a 0 para ver si funciona, pero nada. Please miralo , por que no veo el error
        let query = `SELECT * FROM users WHERE id IN (SELECT user_id_friend as id FROM friends WHERE user_id = ? AND status = 1)`
        const [results] = await global.connection.promise().query(query, [this._id])


        if (results.length > 0) {
            let resultsToReturn = []
            let userToPush = {}
            results.forEach(async user => {
                userToPush.id = user.id
                userToPush.name = user.name
                userToPush.last_name = user.last_name
                userToPush.email = user.email
                userToPush.image = user.image

                resultsToReturn.push(userToPush)
            })
            return resultsToReturn
        } else {
            return "No friends found"
        }

    }

}

module.exports = UsersDAO
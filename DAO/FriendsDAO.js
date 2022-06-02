const GenericDAO = require("./generic.dao")

class FriendsDAO extends GenericDAO {

    constructor() {
        super("friends")
    }

    /**
     * 
     * @param {*} userId 
     * @param {*} status 
     * @returns get friends by user id and status
     */
    async getFriendRequests(userId, status) {
        this._userId = userId
        this._status = status

        const [results] = await global.connection.promise()
            .query("SELECT * FROM ?? WHERE user_id_friend = ? AND status = ?", [this.tabla, this._userId, this._status])
        return results
    }

    /**
     * 
     * @param {*} userId 
     * @param {*} friendId 
     * @returns post friend request result
     */
    async postFriendRequest(userId, friendId) {
        this._userId = userId
        this._friendId = friendId

        const [results] = await global.connection.promise()
            .query("INSERT INTO ?? (user_id, user_id_friend, status) VALUES (?, ?, 0)", [this.tabla, this._userId, this._friendId])
        return results
    }

    /**
     * 
     * @param {*} userId 
     * @param {*} friendId 
     * @returns update friend request result
     */
    async updateFriendRequest(userId, friendId) {
        this._userId = userId
        this._friendId = friendId

        const [results] = await global.connection.promise()
            .query("UPDATE ?? SET status = 1 WHERE user_id = ? AND user_id_friend = ?", [this.tabla, this._userId, this._friendId])
        return results
    }

    /**
     * 
     * @param {*} friendId 
     * @returns delete friend request result
     */
    async deleteFriendRequest(friendId) {
        this._friendId = friendId

        const [results] = await global.connection.promise()
            .query("DELETE FROM ?? WHERE user_id_friend = ?", [this.tabla, this._friendId])
        return results
    }
}

module.exports = FriendsDAO
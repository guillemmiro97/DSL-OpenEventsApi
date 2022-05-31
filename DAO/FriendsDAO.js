const GenericDAO = require("./generic.dao")

class FriendsDAO extends GenericDAO{

    constructor(){
        super("friends")
    }

    async getFriendRequests (userId){
        this._userId = userId

        const [results] = await global.connection.promise()
            .query("SELECT * FROM ?? WHERE user_id_friend = ? AND status = 0", [this.tabla, this._userId])
        return results
    }

    async postFriendRequest(userId, friendId) {
        this._userId = userId
        this._friendId = friendId

        const [results] = await global.connection.promise()
            .query("INSERT INTO ?? (user_id, user_id_friend, status) VALUES (?, ?, 0)", [this.tabla, this._userId,  this._friendId])
        return results
    }

    async updateFriendRequest(userId, friendId) {
        this._userId = userId
        this._friendId = friendId

        const [results] = await global.connection.promise()
            .query("UPDATE ?? SET status = 1 WHERE user_id = ? AND user_id_friend = ?", [this.tabla, this._userId,  this._friendId])
        return results
    }

    async deleteFriendRequest(friendId) {
        this._friendId = friendId

        const [results] = await global.connection.promise()
            .query("DELETE FROM ?? WHERE user_id_friend = ?", [this.tabla, this._friendId])
        return results
    }
}

module.exports = FriendsDAO
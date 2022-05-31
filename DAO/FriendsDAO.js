const GenericDAO = require("./generic.dao")

class FriendsDAO extends GenericDAO{

    constructor(){
        super("friends")
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
class GenericDAO {

    constructor(tabla) {
        this.tabla = tabla;
    }

    /**
     * 
     * @returns get all 
     */
    async getAll() {
        const [results] = await global.connection.promise().query("SELECT * FROM ??", [this.tabla])
        return results;
    }

    /**
     * 
     * @param {*} id 
     * @returns get by id
     */
    async get(id) {
        this._id = id;

        const [results] = await global.connection.promise().query("SELECT * FROM ?? WHERE id = ?", [this.tabla, this._id])
        return results;
    }

    /**
     * 
     * @param {*} id 
     * @returns delete by id
     */
    async delete(id) {
        this._id = id;

        const [results] = await global.connection.promise().query("DELETE FROM ?? WHERE id = ?", [this.tabla, this._id])
        return results;
    }

    /**
     * 
     * @param {*} req 
     * @returns chek token
     */
    async checkToken(req) {
        if (!req.headers.authorization) return false;
        const token = req.headers.authorization.split(' ')[1];

        if (!token) return false;

        const jwt = require('jsonwebtoken');
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            console.log(decoded);
            return decoded;
        } catch (error) {
            return ('401')
        }
    }
}

module.exports = GenericDAO
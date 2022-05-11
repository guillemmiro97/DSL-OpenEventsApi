class GenericDAO {

    constructor(tabla) {
        this.tabla = tabla;
    }

    async getAll() {
        // SELECT * FROM tabla
    }

    async get(id) {
        this._id = id;
        // SELECT * FROM ?? WHERE id = 'params.id'
    }

    async delete(id) {
        this._id = id;
        // DELETE FROM ?? WHERE id = 'params.id'
    }

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
            return next('401')
        }
    }
}

module.exports = GenericDAO
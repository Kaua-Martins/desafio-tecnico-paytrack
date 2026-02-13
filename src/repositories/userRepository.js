const db = require("../config/database");

function findEmail(email) {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM usuario WHERE email = ?", [email], (err, row) => {
            if (err) { reject(err); } else { resolve(row); }
        });
    });
}

function insertUser(user) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO usuario (email, sexo, nome, sobrenome, data_nascimento, celular, pais) VALUES (?, ?, ?, ?, ?, ?, ?)`;

        db.run(sql, [
            user.email,
            user.sexo,
            user.nome,
            user.sobrenome,
            user.data_nascimento,
            user.celular,
            user.pais
        ], function (err) {
            if (err) { reject(err); } else { resolve(); }
        });
    });
}

function updateUser(user) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE usuario SET sexo=?, nome=?, sobrenome=?, data_nascimento=?, celular=?, pais=? WHERE email = ?`;

        db.run(sql, [
            user.sexo,
            user.nome,
            user.sobrenome,
            user.data_nascimento,
            user.celular,
            user.pais
        ], function (err) {
            if (err) { reject(err); } else { resolve(); }
        });
    });
}

function findAllUsers() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM usuario", (err, row) => {
            if (err) { reject(err); } else { resolve(row); }
        });
    });
}

module.exports = {
    findEmail,
    insertUser,
    updateUser,
    findAllUsers
};
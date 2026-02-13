const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "../../database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Erro ao conectar no banco:", err.message);
    }
});

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS usuario (
      email TEXT PRIMARY KEY,
      sexo TEXT,
      nome TEXT,
      sobrenome TEXT,
      data_nascimento TEXT,
      celular TEXT,
      pais TEXT
    )
  `);
});

module.exports = db;
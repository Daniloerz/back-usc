const sql = require("./mysqldb.js");

// constructor
const Club = function(club) {
  this.usuario_id = club.usuario_id;
  this.nombre = club.nombre;
  this.categoria_id = club.categoria_id;
  this.descripcion = club.descripcion;
};

Club.create = (newClub, result) => {
  sql.query("INSERT INTO clubs SET ?", newClub, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Club creado: ", { id: res.insertId, ...newClub });
    result(null, { id: res.insertId, ...newClub });
  });
};

Club.findById = (id, result) => {
  sql.query(`SELECT * FROM clubs WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Club encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // No se encontro el club
    result({ kind: "Not_Found" }, null);
  });
};

Club.getAll = (result) => {
  let query1 = "SELECT * FROM clubs";

  sql.query(query1, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("clubs: ", res);
    result(null, res);
  });
};

Club.updateById = (id, club, result) => {
  sql.query(
    "UPDATE clubs SET usuario_id = ?, nombre = ?, categoria_id = ?, descripcion = ? WHERE id = ?",
    [club.usuario_id, club.nombre, club.categoria_id, club.descripcion, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // Club no encontrado para el Id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Club actualizado: ", { id: id, ...club });
      result(null, { id: id, ...club });
    }
  );
};

Club.remove = (id, result) => {
  sql.query("DELETE FROM clubs WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Club eliminado con id: ", id);
    result(null, res);
  });
};

Club.removeAll = result => {
  sql.query("DELETE FROM clubs", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} clubs`);
    result(null, res);
  });
};

module.exports = Club;
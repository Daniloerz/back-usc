module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define("books", {
    titulo: {
      type: Sequelize.STRING
    },
    autor: {
      type: Sequelize.STRING
    },
    editorial: {
      type: Sequelize.STRING
    },
    anio_publicacion: {
      type: Sequelize.STRING
    },
    categoria_id: {
      type: Sequelize.INTEGER
    },
    isbn: {
      type: Sequelize.STRING
    },
    sinopsis: {
      type: Sequelize.STRING
    },
    img: {
      type: Sequelize.STRING
    },
    link_acceso: {
      type: Sequelize.STRING
    }
  });

  return Book;
};

/*
const sql = require("./mysqldb.js");

// constructor
const Book = function(book) {
  this.titulo = book.titulo;
  this.autor = book.autor;
  this.editorial = book.editorial;
  this.anio_publicacion = book.anio_publicacion;
  this.categoria_id = book.categoria_id;
  this.isbn = book.isbn;
  this.sinopsis = book.sinopsis;
  this.img = book.img;
  this.link_acceso = book.link_acceso;
};

Book.create = (newBook, result) => {
  sql.query("INSERT INTO books SET ?", newBook, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Libro creado: ", { id: res.insertId, ...newBook });
    result(null, { id: res.insertId, ...newBook });
  });
};

Book.findById = (id, result) => {
  sql.query(`SELECT * FROM books WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Libro encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // No se encontro el libro
    result({ kind: "Not_Found" }, null);
  });
};

Book.getAll = (title, result) => {
  let query1 = "SELECT * FROM books";

  if (title) {
    query1 += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query1, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("books: ", res);
    result(null, res);
  });
};

Book.updateById = (id, book, result) => {
  sql.query(
    "UPDATE books SET titulo = ?, autor = ?, editorial = ?, anio_publicacion = ?, categoria_id = ?, isbn = ?, sinopsis = ?, img = ?, link_acceso = ? WHERE id = ?",
    [book.titulo, book.autor, book.editorial, book.anio_publicacion, book.categoria_id, book.isbn, book.sinopsis, book.img, book.link_acceso, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // Libro no encontrado para el Id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Libro actualizado: ", { id: id, ...book });
      result(null, { id: id, ...book });
    }
  );
};

Book.remove = (id, result) => {
  sql.query("DELETE FROM books WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Libro eliminado con id: ", id);
    result(null, res);
  });
};

Book.removeAll = result => {
  sql.query("DELETE FROM books", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} books`);
    result(null, res);
  });
};

module.exports = Book;
*/
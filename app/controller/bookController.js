const Book = require("../models/bookModel.js");

// Crear y guardar libro
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Crear el libro
    const book = new Book({
        titulo : req.body.titulo,
        autor : req.body.autor,
        editorial : req.body.autor,
        anio_publicacion : req.body.autor,
        categoria_id : req.body.autor,
        isbn : req.body.autor,
        sinopsis : req.body.autor,
        img : req.body.autor,
        link_acceso : req.body.autor,
    });
  
    // Guardar libro en la base de datos
    Book.create(book, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Error creando libro"
        });
      else res.send(data);
    });
  };

// Obtener todos los libros de la base de datos
exports.findAll = (req, res) => {
    const title = req.query.title;
  
    Book.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving books."
        });
      else res.send(data);
    });
  };

// Encontrar libro por id
exports.findOne = (req, res) => {
    Book.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Libro no encontrado con id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error obteniendo libro con id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

// Actualizar libro
exports.update = (req, res) => {
    // Validar petición
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    Book.updateById(
      req.params.id,
      new Book(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Libro no encontrado con el id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error actualizando libro con id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

// Eliminar libro por ID
exports.delete = (req, res) => {
    Book.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Libro no encontrado con el id  ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error eliminando libro con id " + req.params.id
          });
        }
      } else res.send({ message: `Libro eliminado exitosamente` });
    });
  };

// Eliminar todos los libros de la tabla
exports.deleteAll = (req, res) => {
    Book.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Error eliminando libros"
        });
      else res.send({ message: `Libros eliminados exitosamente` });
    });
  };
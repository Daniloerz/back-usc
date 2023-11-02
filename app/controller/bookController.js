const db = require("../models");
const Book = db.uscclub;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.titulo) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const book = {
    titulo: req.body.titulo,
    autor: req.body.autor,
    editorial: req.body.autor,
    anio_publicacion: req.body.autor,
    categoria_id: req.body.autor,
    isbn: req.body.autor,
    sinopsis: req.body.autor,
    img: req.body.autor,
    link_acceso: req.body.autor,
  };

  // Save Tutorial in the database
  Book.create(book)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const titulo = req.query.titulo;
  var condition = titulo ? { titulo: { [Op.like]: `%${title}%` } } : null;

  Book.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Book.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Book.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Book.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Book.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};


/*
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
  */
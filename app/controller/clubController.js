const Club = require("../models/clubModel.js");

exports.create = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "El contenido no puede estar vacío"
      });
    }
  
    const club = new Club({
        usuario_id: req.body.userId,
        nombre : req.body.nombre,
        categoria_id : req.body.categoria,
        descripcion : req.body.descripcion,
    });
  
    Club.create(club, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Error creando club"
        });
      else res.send(data);
    });
  };

exports.findAll = (req, res) => {
  
    Club.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Error encontrando los clubs"
        });
      else res.send(data);
    });
  };

exports.findOne = (req, res) => {
    Club.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Club no encontrado con id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error obteniendo club con id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

exports.update = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "El contenido no puede estar vacío"
      });
    }
  
    console.log(req.body);
  
    Club.updateById(
      req.params.id,
      new Club(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Club no encontrado con el id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Club actualizando libro con id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

exports.delete = (req, res) => {
    Club.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Club no encontrado con el id  ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error eliminando club con id " + req.params.id
          });
        }
      } else res.send({ message: `Club eliminado exitosamente` });
    });
  };

// Eliminar todos los libros de la tabla
exports.deleteAll = (req, res) => {
    Club.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Error eliminando club"
        });
      else res.send({ message: `Club eliminados exitosamente` });
    });
  };
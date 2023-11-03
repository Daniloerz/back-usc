const User = require("../models/userModel.js");

exports.create = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "El contenido no puede estar vacío"
      });
    }
  
    const user = new User({
        nombre : req.body.nombre,
        apellido : req.body.apellido,
        numero_documento : req.body.numero_documento,
        correo : req.body.correo,
        fecha_nacimiento : req.body.fecha_nacimiento,
        edad : req.body.edad,
        rol_id : req.body.rol_id,
        contrasenia : req.body.contrasenia,
    });
  
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Error creando usuario"
        });
      else res.send(data);
    });
  };

exports.findAll = (req, res) => {
    const title = req.query.title;
  
    User.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Error encontrando los usuarios"
        });
      else res.send(data);
    });
  };

exports.findOne = (req, res) => {
    User.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Usuario no encontrado con id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error obteniendo usuario con id " + req.params.id
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
  
    User.updateById(
      req.params.id,
      new User(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Usuario no encontrado con el id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Usuario actualizando libro con id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

exports.delete = (req, res) => {
    User.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Usuario no encontrado con el id  ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error eliminando usuario con id " + req.params.id
          });
        }
      } else res.send({ message: `Usuario eliminado exitosamente` });
    });
  };

// Eliminar todos los libros de la tabla
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Error eliminando usuario"
        });
      else res.send({ message: `Usuario eliminados exitosamente` });
    });
  };
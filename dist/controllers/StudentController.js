"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

class StudentController {
  async index(req, res) {
    try {
      const students = await _Student2.default.findAll({
        attributes: [
          "id",
          "name",
          "surname",
          "email",
          "age",
          "weight",
          "height",
        ],
        order: [
          ["id", "DESC"],
          [_Photo2.default, "id", "DESC"],
        ],
        include: {
          model: _Photo2.default,
          attributes: ["url", "filename"],
        },
      });
      res.json(students);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((error) => error.message),
      });
    }
  }

  async create(req, res) {
    try {
      const student = await _Student2.default.create(req.body);
      res.json(`Aluno(a) ${student.name} adicionado.`);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((error) => error.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ["ID não informado."],
        });
      }

      const student = await _Student2.default.findByPk(id, {
        attributes: [
          "id",
          "name",
          "surname",
          "email",
          "age",
          "weight",
          "height",
        ],
        include: {
          model: _Photo2.default,
          attributes: ["url", "filename"],
        },
      });

      if (!student) {
        return res.status(400).json({
          errors: ["O aluno não está registrado no sistema."],
        });
      }

      return res.json(student);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((error) => error.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ["ID não informado."],
        });
      }

      const student = await _Student2.default.findByPk(id);

      if (!student) {
        return res.status(400).json({
          errors: ["O aluno não está registrado no sistema."],
        });
      }
      if (!req.body) {
        return res.json(`Sem alterações em ${student.name}.`);
      }
      await student.update(req.body);
      return res.json(`Aluno ${student.name} atualizado.`);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((error) => error.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ["ID não informado."],
        });
      }

      const student = await _Student2.default.findByPk(id);

      if (!student) {
        return res.status(400).json({
          errors: ["O aluno não está registrado no sistema."],
        });
      }

      await student.destroy();
      return res.json(`Aluno(a) ${student.name} excluído.`);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((error) => error.message),
      });
    }
  }
}

exports. default = new StudentController();

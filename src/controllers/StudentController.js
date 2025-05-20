import Student from "../models/Student";
import Photo from "../models/Photo";

class StudentController {
  async index(req, res) {
    try {
      const students = await Student.findAll({
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
          [Photo, "id", "DESC"],
        ],
        include: {
          model: Photo,
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
      const student = await Student.create(req.body);
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

      const student = await Student.findByPk(id, {
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
          model: Photo,
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

      const student = await Student.findByPk(id);

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

      const student = await Student.findByPk(id);

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

export default new StudentController();

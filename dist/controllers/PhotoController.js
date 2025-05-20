"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('../config/multer'); var _multer4 = _interopRequireDefault(_multer3);

var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

const upload = _multer2.default.call(void 0, _multer4.default).single("photoMultipart");

class PhotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      const { originalname, filename } = req.file;
      const { student_id } = req.body;
      try {
        const student = await _Photo2.default.create({
          originalname,
          filename,
          student_id,
        });

        return res.json({
          added: `Foto adicionada ao id ${student_id}.`,
          info: student,
        });
      } catch (e) {
        return res.status(400).json({
          errors: ["Student id isn't registered."],
        });
      }
    });
  }
}

exports. default = new PhotoController();

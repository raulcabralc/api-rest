"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Student extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 30],
              msg: "Name must have between 3 and 30 characters.",
            },
          },
        },
        surname: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 30],
              msg: "Surname must have between 4 and 30 characters.",
            },
          },
        },
        email: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          unique: {
            msg: "Email is already registered.",
          },
          validate: {
            isEmail: {
              msg: "Please, enter a valid email.",
            },
          },
        },
        age: {
          type: _sequelize2.default.INTEGER,
          defaultValue: "",
          validate: {
            isInt: {
              msg: "Age must be a number.",
            },
          },
        },
        weight: {
          type: _sequelize2.default.FLOAT,
          defaultValue: "",
          validate: {
            isFloat: {
              msg: "Weight must be an integer number.",
            },
          },
        },
        height: {
          type: _sequelize2.default.FLOAT,
          defaultValue: "",
          validate: {
            isFloat: {
              msg: "Height must be a number.",
            },
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: "student_id" });
  }
} exports.default = Student;

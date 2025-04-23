"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class User extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [4, 50],
              msg: "Name must have between 4 and 50 characters",
            },
          },
        },
        email: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          unique: {
            msg: "Email already exists.",
          },
          validate: {
            isEmail: {
              msg: "Invalid Email",
            },
          },
        },
        password_hash: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
        },
        password: {
          type: _sequelize2.default.VIRTUAL,
          defaultValue: "",
          validate: {
            len: {
              args: [6, 50],
              msg: "Password must have between 6 and 50 characters",
            },
          },
        },
      },
      {
        sequelize,
      }
    );
    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });
    return this;
  }

  passwordIsValid(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
} exports.default = User;

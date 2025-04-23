"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
const router = new (0, _express.Router)();

var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

var _StudentController = require('../controllers/StudentController'); var _StudentController2 = _interopRequireDefault(_StudentController);

router.get("/", _StudentController2.default.index);
router.post("/create/", _loginRequired2.default, _StudentController2.default.create);
router.get("/show/:id", _StudentController2.default.show);
router.put("/update/:id", _loginRequired2.default, _StudentController2.default.update);
router.delete("/delete/:id", _loginRequired2.default, _StudentController2.default.delete);

exports. default = router;

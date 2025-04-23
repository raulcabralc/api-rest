"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/*
index -> lista todos os usuários -> GET
store/create -> cria um novo usuário -> POST
delete -> apaga um usuário -> DELETE
show -> mostra um usuário -> GET
update -> atualiza um usuário -> PATCH / PUT
*/

var _express = require('express');
const router = new (0, _express.Router)();
var _HomeController = require('../controllers/HomeController'); var _HomeController2 = _interopRequireDefault(_HomeController);

router.get("/", _HomeController2.default.index);

exports. default = router;

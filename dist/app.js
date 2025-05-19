"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Dotenv
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
_dotenv2.default.config();

require('./database');

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);

// Routes
var _homeRoute = require('./routes/homeRoute'); var _homeRoute2 = _interopRequireDefault(_homeRoute);
var _userRoute = require('./routes/userRoute'); var _userRoute2 = _interopRequireDefault(_userRoute);
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);
var _studentRoute = require('./routes/studentRoute'); var _studentRoute2 = _interopRequireDefault(_studentRoute);
var _photoRoutes = require('./routes/photoRoutes'); var _photoRoutes2 = _interopRequireDefault(_photoRoutes);

var _path = require('path');

const whiteList = ["http://35.198.38.2", "http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_cors2.default.call(void 0, corsOptions));
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
    this.app.use(
      "/images",
      _express2.default.static(_path.resolve.call(void 0, __dirname, "..", "uploads", "images"))
    );
  }

  routes() {
    this.app.use("/", _homeRoute2.default);
    this.app.use("/users/", _userRoute2.default);
    this.app.use("/token/", _tokenRoutes2.default);
    this.app.use("/students/", _studentRoute2.default);
    this.app.use("/photo/", _photoRoutes2.default);
  }
}

exports. default = new App().app;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controlers/userController");
const router = (0, express_1.Router)();
router.post('/registro', userController_1.CrearUsuario);
router.post('/login', userController_1.LoginUsuario);
exports.default = router;

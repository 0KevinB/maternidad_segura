"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medicoController_1 = require("../controlers/medicoController");
const router = (0, express_1.Router)();
router.get('/contacto-medico', medicoController_1.ObtenerMedicos);
exports.default = router;

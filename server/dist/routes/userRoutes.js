"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controlers/userController");
const router = (0, express_1.Router)();
router.post('/registro', userController_1.CrearUsuario);
router.post('/login', userController_1.LoginUsuario);
router.post('/datos-medicos', userController_1.CrearDatosMedicos);
router.post('/datos-obstetricos', userController_1.CrearAntecedentesObstetricos);
router.post('/datos-embarazo', userController_1.CrearEmbarazoActual);
router.post('/datos-habitos', userController_1.CrearHabitos);
router.post('/datos-nutricion', userController_1.CrearNutricion);
router.post('/datos-actividad', userController_1.CrearActividadFisica);
exports.default = router;

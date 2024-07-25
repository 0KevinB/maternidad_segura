import { Router } from 'express';
import { CrearActividadFisica, CrearAntecedentesObstetricos, CrearDatosMedicos, CrearEmbarazoActual, CrearHabitos, CrearNutricion, CrearUsuario, LoginUsuario, ObtenerDatosUsuario, ObtenerRecomendaciones, } from '../controlers/userController';

const router = Router();

router.post('/registro', CrearUsuario);
router.post('/login', LoginUsuario);
router.post('/datos-medicos', CrearDatosMedicos);
router.post('/datos-obstetricos', CrearAntecedentesObstetricos);
router.post('/datos-embarazo', CrearEmbarazoActual);
router.post('/datos-habitos', CrearHabitos);
router.post('/datos-nutricion', CrearNutricion);
router.post('/datos-actividad', CrearActividadFisica);
router.post('/recomendaciones', ObtenerDatosUsuario);
router.get('/obtener-datos/:id', ObtenerDatosUsuario);
router.get('/obtener-recomendaciones/:id', ObtenerRecomendaciones);
export default router;

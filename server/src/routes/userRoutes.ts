import { Router } from 'express';
import obtenerDatosUsuario, { CrearActividadFisica, CrearAntecedentesObstetricos, CrearDatosMedicos, CrearEmbarazoActual, CrearHabitos, CrearNutricion, CrearUsuario, LoginUsuario, ObtenerRecomendaciones } from '../controlers/userController';

const router = Router();

router.post('/registro', CrearUsuario);
router.post('/login', LoginUsuario);
router.post('/datos-medicos', CrearDatosMedicos);
router.post('/datos-obstetricos', CrearAntecedentesObstetricos);
router.post('/datos-embarazo', CrearEmbarazoActual);
router.post('/datos-habitos', CrearHabitos);
router.post('/datos-nutricion', CrearNutricion);
router.post('/datos-actividad', CrearActividadFisica);
router.post('/recomendaciones', ObtenerRecomendaciones);
router.get('/obtener-datos/:usuario_id', obtenerDatosUsuario)
export default router;

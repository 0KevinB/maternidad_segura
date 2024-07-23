import { Router } from 'express';
import { CrearMedico, ObtenerMedicos } from '../controlers/medicoController';

const router = Router();

router.get('/contacto-medico', ObtenerMedicos);
router.post('/crear-medico', CrearMedico);
export default router;

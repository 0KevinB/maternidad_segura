import { Router } from 'express';
import { ObtenerMedicos } from '../controlers/medicoController';

const router = Router();

router.get('/contacto-medico', ObtenerMedicos);

export default router;

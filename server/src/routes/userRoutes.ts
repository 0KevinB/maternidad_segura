import { Router } from 'express';
import { CrearUsuario, LoginUsuario } from '../controlers/userController';

const router = Router();

router.post('/registro', CrearUsuario);
router.post('/login', LoginUsuario);

export default router;

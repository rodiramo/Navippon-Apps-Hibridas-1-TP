import express from 'express';
import * as alumnosController from '../controllers/alumnos.api.controllers.js';

const router = express.Router();

router.get('/alumnos', alumnosController.getAlumnos);
router.post('/alumnos', alumnosController.createAlumno);

router.get('/alumnos/:legajo', alumnosController.getAlumnoByLegajo);
router.put('/alumnos/:legajo', alumnosController.replaceAlumno);
router.patch('/alumnos/:legajo', alumnosController.updateAlumno);
router.delete('/alumnos/:legajo', alumnosController.deleteAlumno);

export default router;

import express from 'express'
import * as controller from '../controllers/alumnos.controllers.js'

const route = express.Router()

route.get('/alumnos', controller.getAlumnos)

route.get('/alumnos/new', controller.formCreateAlumno)
route.post('/alumnos/new', controller.createAlumno)
route.post('/alumnos', controller.createAlumno);
route.get('/alumnos/:legajo/edit', controller.formEditAlumno)
route.post('/alumnos/:legajo/edit', controller.editAlumno)

route.get('/alumnos/:legajo/delete', controller.formDeleteAlumno)
route.post('/alumnos/:legajo/delete', controller.deleteAlumno)

route.get('/alumnos/:legajo', controller.getAlumnoByLegajo)

export default route

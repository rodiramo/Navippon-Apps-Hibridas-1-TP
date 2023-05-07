import * as view from '../views/alumnos.view.js'
import * as service from '../services/alumnos.service.js'

function getAlumnos(req, res) {
    service.getAlumnos({ deleted: true })
        .then(function (alumnos) {
            res.send(view.generateListAlumnos(alumnos))
        })
}

function getAlumnoByLegajo(req, res) {
    let id = req.params.legajo

    service.getAlumnoByLegajo(id)
        .then(function (alumno) {

            if (alumno) {

                res.send(view.generateAlumnoDetail(alumno))
            }
            else {
                res.send(view.generatePage('Alumno Detail', `<h1>Alumno not found.</h1>`))
            }
        })
}

function formCreateAlumno(req, res) {
    res.send(view.generateNewAlumnoForm())
}

function createAlumno(req, res) {
    const alumno = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        legajo: req.body.legajo,
        año: req.body.año,
    }
    console.log(alumno);

    service.createAlumno(alumno)
        .then(function (alumno) {
            res.send(view.generatePage('Alumno Added', `<h1>Alumno successfully Added!</h1>`))
        })
        .catch(function (err) {
            res.send(view.generatePage('Error in Adding the Alumno :(', `<h1>${err}</h1>`))
        })

}


function formEditAlumno(req, res) {
    let id = req.params.legajo

    service.getAlumnoByLegajo(id)
        .then(function (alumno) {
            if (alumno) {
                res.send(view.generateEditAlumnoForm(alumno))
            }
            else {
                res.send(view.generatePage('Edit Alumno Info', `<h1>Alumno not Fount.</h1>`))
            }
        })
}

function editAlumno(req, res) {
    let id = req.params.legajo

    let alumno = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        año: req.body.año,
        legajo: req.body.legajo
    }

    service.editAlumno(id, alumno)
        .then(function (alumno) {
            if (alumno) {
                res.send(view.generatePage('Alumno Edited', `<h1>Alumno Edited Successfully</h1>`))
            }
            else {
                res.send(view.generatePage('Alumno Edited', `<h1>Alumno not Found</h1>`))
            }
        })
        .catch(function (err) {
            res.send(view.generatePage('Error Editing Alumno', `<h1>${err}</h1>`))
        })
}

function formDeleteAlumno(req, res) {
    let id = req.params.legajo

    service.getAlumnoByLegajo(id)
        .then(function (alumno) {
            if (alumno) {
                res.send(view.generateDeleteAlumno(alumno))
            }
            else {
                res.send(view.generatePage('Alumno Detail', `<h1>Alumno not Found</h1>`))
            }
        })
}


function deleteAlumno(req, res) {
    let id = req.params.legajo

    service.deleteAlumno(id)
        .then(function (alumno) {
            if (alumno) {
                res.send(view.generatePage('Alumno Deleted', `<h1>Alumno Deleted Successfully!</h1>`))
            }
            else {
                res.send(view.generatePage('Alumno Detail', `<h1>Alumno not Found</h1>`))
            }
        })
      }

export {
    getAlumnos,
    getAlumnoByLegajo,
    formCreateAlumno,
    createAlumno,
    formEditAlumno,
    editAlumno,
    formDeleteAlumno,
    deleteAlumno
}
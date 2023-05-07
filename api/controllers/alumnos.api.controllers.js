import * as service from '../../services/alumnos.service.js'

function getAlumnos(req, res) {

    const filter = req.query

    service.getAlumnos(filter)
        .then(function (alumnos) {
            res.status(200).json(alumnos)
        })
}

function createAlumno(req, res) {
    const alumno = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        legajo: req.body.legajo,
        año: req.body.año,
    }

    service.createAlumno(alumno)
        .then(function (newAlumno) {
            res.status(201).json(newAlumno)
        })
}

function getAlumnoByLegajo(req, res) {
    const legajo = req.params.legajo

    service.getAlumnoByLegajo(legajo)
        .then(function (alumno) {
            if (alumno) {
                res.status(200).json(alumno)
            }
            else {
                res.status(404).json({ error: { message: `Alumno not Found #${legajo}` } })
            }
        })

}

function replaceAlumno(req, res) {
    let legajo = req.params.legajo

    let alumno = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        año: req.body.año,
        legajo: req.body.legajo
    }

    service.replaceAlumno(legajo, alumno)
        .then(function (alumno) {
            if (alumno) {
                res.status(200).json(alumno)
            }
            else {
                res.status(404).json({ error: { message: `Alumno not Found #${legajo}` } })
            }
        })
}

function updateAlumno(req, res) {
    let legajo = req.params.legajo

    let alumno = {}

    if (req.body.nombre) {
        alumno.nombre = req.body.nombre
    }
    if (req.body.apellido) {
        alumno.apellido = req.body.apellido
    }

    if (req.body.año) {
        alumno.año = req.body.año
    }

    if (req.body.legajo) {
        alumno.legajo = req.body.legajo
    }

    service.editAlumno(legajo, alumno)
        .then(function (alumno) {
            if (alumno) {
                res.status(200).json(alumno)
            }
            else {
                res.status(404).json({ error: { message: `Alumno not Found #${legajo}` } })
            }
        })
}



function deleteAlumno(req, res) {
    let legajo = req.params.legajo

    service.deleteAlumno(legajo)
        .then(function (alumno) {
            if (alumno) {
                res.status(200).json(alumno)
            }
            else {
                res.status(404).json({ error: { message: `Alumno not Found #${legajo}` } })
            }
        })
}
export {
    getAlumnos,
    createAlumno,
    getAlumnoByLegajo,
    replaceAlumno,
    updateAlumno,
    deleteAlumno
}

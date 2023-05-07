import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient("mongodb://127.0.0.1:27017")
const db = client.db("ROCIODB")

async function getAlumnos(filter = {}) {
    await client.connect()
    const filterMongo = { deleted: { $ne: true } }

    if (filter?.legajo) {
        filterMongo.legajo = { $eq: filter.legajo }
    }

    if (filter?.nombre) {
        filterMongo.nombre = { $regex: `.*${filter.nombre}.*`, $options: 'i' }
    }
  
    if (filter?.año) {
        filterMongo.año = { $eq: filter.año }
    }

    return db.collection("students").find(filterMongo).toArray()
}

async function getAlumnoByLegajo(legajo) {
    await client.connect()

    return db.collection("students").findOne({ _id: new ObjectId(legajo) })
}

async function createAlumno(alumno) {
    await client.connect()

   await db.collection("students").insertOne(alumno)

    return alumno
}

async function editAlumno(legajo, alumno) {
    await client.connect()

    return db.collection("students").updateOne({ _id: new ObjectId(legajo) }, { $set: alumno })
}

async function replaceAlumno(legajo, alumno) {
    await client.connect()

    return db.collection("students").replaceOne({ _id: new ObjectId(legajo) }, alumno)
}

async function deleteAlumno(legajo) {
    await client.connect()

    return db.collection("students").deleteOne({ _id: new ObjectId(legajo) })
}

export {
    getAlumnos,
    getAlumnoByLegajo,
    createAlumno,
    editAlumno,
    deleteAlumno,
    replaceAlumno
}

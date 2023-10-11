import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient("mongodb://127.0.0.1:27017")
const db = client.db("ROCIODB")

async function getActivities(filter = {}) {
    await client.connect()
    const filterMongo = { deleted: { $ne: true } }

    return db.collection("Activities").find(filterMongo).toArray();
}

async function getCities() {

      await client.connect(); 
      const uniqueCities = await db.collection("Activities").distinct('city');
      return uniqueCities;
   
  }
  
  async function getActivitiesByCity(city) {
    const filter = { city: city };
    const activitiesInCity = await db.collection("Activities").find(filter).toArray();
    return activitiesInCity;
}


async function getActivityByID(id) {
    if (!ObjectId.isValid(id)) {
        throw new Error('Invalid ObjectId');
    }

    return db.collection("Activities").findOne({ _id: new ObjectId(id) });
}

async function createActivity(activity) {
    const result = await db.collection("Activities").insertOne(activity);
    return result.insertedId; 
}

async function replaceActivity(id, activity) {
    const editedActivity = await db.collection("Activities").replaceOne({ _id: new ObjectId(id) }, activity);
    return editedActivity;
}

async function editActivity(id, activity) {
    const editedActivity = await db.collection("Activities").updateOne({ _id: new ObjectId(id) }, { $set: activity });
    return editedActivity;
}

async function deleteActivity(id) {
    const deletedActivity = await db.collection("Activities").deleteOne({ _id: new ObjectId(id) }); 
    return deletedActivity;
}

export {
    getCities,
    getActivitiesByCity,
    getActivities,
    getActivityByID,
    createActivity,
    editActivity,
    deleteActivity,
    replaceActivity
}

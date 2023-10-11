import { MongoClient, ObjectId } from 'mongodb';

const users = new MongoClient("mongodb://127.0.0.1:27017");
const db = users.db("ROCIODB");

async function getUsers() {
    const usersCollection = db.collection('Users');
    return await usersCollection.find().toArray();
}

async function createUser(user) {
    const usersCollection = db.collection('Users');
    const result = await usersCollection.insertOne(user);
    return result.insertedId;
}

async function getUserWithActivities(id) {
    if (!ObjectId.isValid(id)) {
        throw new Error(`Invalid ObjectId: ${id}`);
    }

    const user = await db.collection("Users").findOne({ _id: new ObjectId(id) });

    if (user) {
        const activities = await db
            .collection("Activities")
            .find({ _id: { $in: user.activities } })
            .toArray();
        user.activities = activities;
    }

    return user;
}

export {
    createUser,
    getUserWithActivities,
    getUsers,
};

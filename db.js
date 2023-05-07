import {MongoClient} from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017/students");

client.connect()
        .then(function(){
        console.log("Connected to MongoDB");
            const db = client.db("ROCIODB");
            db.collection("students").insertOne({name: "Hola desde Node"});              
        })
        .catch(function(){
            console.log("Error connecting");
        })
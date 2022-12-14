const {MongoClient} = require('mongodb');
const express = require('express');

const app = express();



async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://tdsaprojekt:tdsaprojekt@tdsaprojekt.7z5lfwd.mongodb.net/?retryWrites=true&w=majority";


    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await  listDatabases(client);
        await pickTenAnimals(client);
        await pickTenFlowers(client);
        //await  findCat(client, "kočka");

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client){
    let databasesList;
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

let selectedAnimals = [];

async function pickTenAnimals(client){
    selectedAnimals = await client.db("hra").collection("animals").aggregate([{$sample: {size: 10}}]).toArray();
}

let selectedFlowers = [];

async function pickTenFlowers(client){
    selectedFlowers = await client.db("hra").collection("flowers").aggregate([{$sample: {size: 10}}]).toArray();
}


async function findCat(client, findingValue){

    selected = [await client.db("hra").collection("animals").findOne({name: findingValue}), await client.db("hra").collection("animals").findOne({name: "pes"})];

}

app.get("/animals", function(req, res) {

    res.set({
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true
    });

    res.send(selectedAnimals);
});

app.get("/flowers", function(req, res) {

    res.set({
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true
    });

    res.send(selectedFlowers);
});


let port = 4000;

app.listen(port, function() {
    console.log("Server started successfully");
    console.log(port);
});

main().catch(console.error);
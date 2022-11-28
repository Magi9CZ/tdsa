const {MongoClient} = require('mongodb')



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
        await  findCat(client, "kočka");

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

let selected = [];

async function findCat(client, findingValue){

    selected = [await client.db("hra").collection("animals").findOne({name: findingValue}), await client.db("hra").collection("animals").findOne({name: "pes"})];


    console.log(selected[1].photo);
}

app.get("/database", function(req, res) {
    res.send(selected);
});
let port = process.env.PORT;
if(port == null || port == "") {
    port = 5000;
}
app.listen(port, function() {
    console.log("Server started successfully");
});

main().catch(console.error);

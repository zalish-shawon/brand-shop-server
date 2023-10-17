const express = require('express');
const cors = require('cors');
const app =express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5001;

// brandShop
// tuOPFNSBa2lPWhQD



const uri = "mongodb+srv://brandShop:tuOPFNSBa2lPWhQD@cluster0.hrjn1tt.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const productCollection = client.db("productsDB").collection("products");

    app.post("/products", async(req, res) => {
        const product = req.body
        // console.log(product);
        const result = await productCollection.insertOne(product);
        res.send(result);
    })

    app.get("/products", async(req, res) => {
        const cursor = productCollection.find()
        const result = await cursor.toArray();
        res.send(result);
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);







app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Brand shop server is running")
});

app.listen(port,()=> {
    console.log(`Brand shop server is listening on ${port}`);
});
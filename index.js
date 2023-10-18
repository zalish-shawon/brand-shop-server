const express = require('express');
const cors = require('cors');
const app =express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const myCartCollection = client.db("productsDB").collection("myCart");

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

    app.get("/products/:id", async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await productCollection.findOne(query);
      res.send(result);
    })

    app.put("/products/:id", async (req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const options = {upsert: true};
      const updatedProduct = req.body
      const product = {
        $set: {

          name: updatedProduct.name,
           description: updatedProduct.description,
           image: updatedProduct.image,
           price: updatedProduct.price,
           rating: updatedProduct.rating,
           type: updatedProduct.type,
           brand: updatedProduct.brand,
      }
    }
    const result = await productCollection.updateOne(filter,product, options)
    res.send(result);
    })

    app.post("/myCarts", async(req, res) => {
      const cart = req.body
      // console.log(cart);
      const result = await myCartCollection.insertOne(cart);
      res.send(result);
  })

  app.get("/myCarts", async(req, res) => {
    const cursor = myCartCollection.find()
    const result = await cursor.toArray();
    res.send(result);
})

  app.delete("/myCarts/:id", async(req, res) => {
    const id = req.params.id
    const query = {_id: new ObjectId(id)}
    const result = await myCartCollection.deleteOne(query)
    res.send(result);
  });

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
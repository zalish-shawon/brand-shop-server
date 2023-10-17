const express = require('express');
const cors = require('cors');
const app =express();
const port = process.env.PORT || 5001;



app.get("/", (req, res) => {
    res.send("Brand shop server is running")
});

app.listen(port,()=> {
    console.log(`Brand shop server is listening on ${port}`);
});
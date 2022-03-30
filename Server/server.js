import  express from "express"
import products from "./data/Products.js";

const app = express()

//Load product from server
app.get("/api/products", (req,res) => {
    res.json(products)
});

//Single project from server
app.get("/api/products/:id", (req,res) => {
    const product = products.find((p) => p._id === req.params.id);
    res.json(product);
});

app.get("/", (req,res) => {
    res.send("Api is Runing.... ")
});

app.listen(5000,console.log("server running port 5000..."))
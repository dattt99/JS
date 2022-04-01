import  express from "express"
import products from "./data/Products.js";
import dotenv from "dotenv"
import connectDatabase from './config/MongoDb.js';
import ImportData from "./DataImport.js";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import productRoute from "./Routes/ProductRoutes.js";

dotenv.config();
connectDatabase(); 
const app = express()

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Library API",
        version: "1.0.0",
        description: "A simple Express Library API",
        termsOfService: "http://example.com/terms/",
        contact: {
          name: "API Support",
          url: "http://www.exmaple.com/support",
          email: "support@example.com",
        },
      },
  
      servers: [
        {
          url: "http://localhost:5000",
          description: "My API Documentation",
        },
      ],
    },
    apis: ["./Routes/*.js"],
  };
  
  const specs = swaggerJsDoc(options);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

//API
app.use("/api/import", ImportData)
app.use("/api/products", productRoute)

app.get("/", (req,res) => {
    res.send("Api is Runing.... ")
});

const PORT = process.env.PORT || 1000

app.listen(PORT,console.log(`server run in port ${PORT}`))
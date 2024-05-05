/**
 * Starts the server and listens on the specified port.
 * @param {number} PORT - The port number to listen on.
 */
//main-file-server
import express from "express";
import { PORT, mongoUri } from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js";
import booksRoutes from "./routes/booksRoutes.js";
import cors from "cors";

// Create a new Express application
const app = express();
// Parse requests of the content type application/json
app.use(express.json());
//Handle CORS
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))

app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send("Hola, Mundo!");
});

app.use('/books', booksRoutes);

// Connection to MongoDB
mongoose
    .connect(mongoUri).then(() => {
        console.log("Conectado a MongoDB con éxito!");
        // Define a route handler for the GET / route
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("No se ha podido conectar con exito: ", error);
    });
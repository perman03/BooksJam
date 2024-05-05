import express from "express";
import {Book} from "../models/bookModel.js";


const router = express.Router();


// Define a route handler for the GET /books route _ CREATE BOOKS
router.post("/", async (req, res) => {
    try{
        // Check if the request body is missing any required fields
        if(!req.body.title || !req.body.author || !req.body.publicationDate){
            return res.status(400).send("Title, author, and publicationDate are required");
        }
        // Create a new book object
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publicationDate: req.body.publicationDate,
        };
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});

// Get all books from DB - Postman (3 books created) _ READ BOOKS  
router.get("/", async (req, res) => {
    try{
        const books = await Book.find();
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});

// Get One Book by ID - Postman (Get book by ID) _ READ BOOKS
router.get("/:id", async (req, res) => {
    try{
        const {id} = req.params;

        const book = await Book.findById(id);
        return res.status(200).json({
            count: book.length,
            data: book
        });
    } catch(error){
        console.log(error);
        res.status(500).send(error);
    }
});

// Update a book by ID - Postman (Update book by ID) _ UPDATE BOOKS
router.put("/:id", async (req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publicationDate){
            return res.status(400).send("Title, author, and publicationDate are required");
        }
    // Update by ID
    const {id} = req.params;
    const results = await Book.findByIdAndUpdate(id, req.body)
    // validate results...
    if(!results){
        return res.status(404).send("Book not found");
    }
    return res.status(200).send('Se ha actualizado el libro con éxito');

    }catch(error){
        console.log(error);
        res.status(500).send('Error al actualizar el libro');
    }
});

// Delete a book by ID - Postman (Delete book by ID) _ DELETE BOOKS

router.delete("/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const results = await Book.findByIdAndDelete(id);
        if(!results){
            return res.status(404).send("Book not found");
        }
        return res.status(200).send('Se ha eliminado el libro con éxito');
    }catch(error){
        console.log(error);
        res.status(500).send('Error al eliminar el libro');
    }
});

export default router;


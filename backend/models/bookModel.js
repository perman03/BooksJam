import mongoose from "mongoose";

// Define a new schema for our book model - ID Management is done by MongoDB
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publicationDate: {
        type: Number,
        required: true,
    },
},
{
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
});

export const Cat = mongoose.model('Cat', { name: String });
export const Book = mongoose.model("Book", bookSchema);
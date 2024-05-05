import dotenv from 'dotenv';
dotenv.config();

export const PORT = 5555;
export const mongoUri = process.env.MONGO_URI
import express from 'express';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());

// Use PORT from .env file with fallback to 3000
const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('<h1>Server is running...</h1>');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
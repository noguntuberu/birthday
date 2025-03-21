import dotenv from 'dotenv';
import app from './app';

// Load environment variables from .env file
dotenv.config();

// Use PORT from .env file with fallback to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
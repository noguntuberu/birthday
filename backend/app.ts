import express from 'express';
const app = express();
app.use(express.json());



app.get('/', (_req, res) => {
  res.send('<h1>Server is running...</h1>');
});

export default app;
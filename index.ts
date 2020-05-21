import express from 'express';
import bmiCalculator from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get(`/bmi?`, (req, res) => {
  if ('height' in req.query && 'weight' in req.query) {
    const results = bmiCalculator(req.query);
    res.send(results);
  } else {
    res.status(400).send({ error: 'malformatted parameters' });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

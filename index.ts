import express from 'express';
import { calculateBmi } from './bmiCalculator';
import {
  calculateExercise,
  parseExerciseArguments,
} from './exerciseCalculator';
import { CLIENT_RENEG_WINDOW } from 'tls';
import { rejects } from 'assert';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get(`/bmi`, (req, res) => {
  const { height, weight } = req.query;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const results = calculateBmi(Number(height), Number(weight));
    const json = {
      height: Number(height),
      weight: Number(weight),
      bmi: results,
    };
    res.send(json);
  } else {
    res.status(400).send({ error: 'Malformatted parameters' });
  }
});

app.get('/exercises', (_req, res) => {
  res.send('lol');
});

app.post('/exercises', (req, res) => {
  const { dailyExercises, target } = req.body;
  if (!dailyExercises || !target) {
    res.json({ error: 'parameters missing' });
  }
  const calculated = calculateExercise(target, dailyExercises);
  res.json(calculated);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

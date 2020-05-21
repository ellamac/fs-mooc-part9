type successRate = 1 | 2 | 3;

interface ExerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: successRate;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  value1: number;
  value2: Array<number>;
}

interface JsonError {
  error: string;
}

export const parseExerciseArguments = (
  target: string,
  daily: Array<string>
): ExerciseValues => {
  if (!target || !daily) throw new Error('Not enough arguments');

  const value2 = daily.map((d) => {
    if (!isNaN(Number(d))) {
      return Number(d);
    } else {
      throw new Error('Provided values were not numbers!');
    }
  });

  const value1 = !isNaN(Number(target)) ? Number(target) : null;
  if (value1 === null) {
    throw new Error('Provided values were not numbers!');
  }

  return { value1, value2 };
};

export const calculateExercise = (
  target: number,
  daily: Array<number>
): ExerciseResults | JsonError => {
  if (isNaN(target)) {
    return { error: 'malformatted parameters' };
  }
  let trainingDays = 0;
  let trainingHours = 0;
  const mappedDaily = daily.map((d) => {
    if (isNaN(d)) {
      return -1;
    }
    if (d > 0) {
      trainingDays++;
      trainingHours = trainingHours + d;
    }
  });
  if (mappedDaily.includes(-1)) return { error: 'malformatted parameters' };

  const average = trainingHours / daily.length;
  const success = average >= target ? true : false;
  const rating: successRate = success ? 3 : average / target >= 0.5 ? 2 : 1;
  const ratingDescription =
    rating === 3
      ? 'Awesome, you reached your goals!'
      : rating === 2
      ? 'Not too bad but could be better'
      : 'So bad :(';
  const results = {
    periodLength: daily.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
  return results;
};

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

const parseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  let array = args.slice(3, args.length);
  const value2 = array.map((d) => {
    if (!isNaN(Number(d))) {
      return Number(d);
    } else {
      throw new Error('Provided values were not numbers!');
    }
  });
  let target = args[2];
  const value1 = !isNaN(Number(target)) ? Number(target) : null;
  if (value1 === null) {
    throw new Error('Provided values were not numbers!');
  }

  return { value1, value2 };
};

const calculateExercise = (
  target: number,
  daily: Array<number>
): ExerciseResults => {
  if (isNaN(target)) {
    throw new Error('Target value was not a number');
  }
  let trainingDays = 0;
  let trainingHours = 0;
  daily.map((d) => {
    if (isNaN(d)) {
      throw new Error('Provided daily exercise hours were not numbers');
    }
    if (d > 0) {
      trainingDays++;
      trainingHours = trainingHours + d;
    }
  });

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

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateExercise(value1, value2));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

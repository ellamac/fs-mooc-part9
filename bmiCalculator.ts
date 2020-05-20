interface BmiValues {
  value1: number;
  value2: number;
}

const parseBmiArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (
    !isNaN(Number(args[2])) &&
    Number(args[2]) > 0 &&
    !isNaN(Number(args[3])) &&
    Number(args[3]) > 0
  ) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers or they were 0 or less!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);
  const message =
    bmi <= 15
      ? 'very severely underweight'
      : bmi > 15 && bmi <= 16
      ? 'Severely underweight'
      : bmi > 16 && bmi <= 18.5
      ? 'Underweight'
      : bmi > 18.5 && bmi <= 25
      ? 'Normal (healthy weight)'
      : bmi > 25 && bmi <= 30
      ? 'Overweight'
      : bmi > 30 && bmi <= 35
      ? 'Obese Class I (Moderately obese)'
      : bmi > 35 && bmi <= 40
      ? 'Obese Class II (Severely obese)'
      : 'Obese Class III (Very severely obese)';
  return message;
};

try {
  const { value1, value2 } = parseBmiArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

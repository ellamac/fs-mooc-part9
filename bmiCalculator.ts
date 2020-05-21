interface Query {
  height: string;
  weight: string;
}

interface BmiValues {
  value1: number;
  value2: number;
}

interface BmiJson {
  height: number;
  weight: number;
  bmi: string;
}
interface ErrorJson {
  error: string;
}

const parseBmiArguments = (args: Query): BmiValues => {
  if (!('height' in args)) throw new Error('height missing');
  if (!('weight' in args)) throw new Error('weight missing');

  if (
    !isNaN(Number(args.height)) &&
    Number(args.height) > 0 &&
    !isNaN(Number(args.weight)) &&
    Number(args.weight) > 0
  ) {
    return {
      value1: Number(args.height),
      value2: Number(args.weight),
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

const bmiCalculator = (argv: object): BmiJson | ErrorJson => {
  try {
    const { value1, value2 } = parseBmiArguments(argv);
    const bmi = calculateBmi(value1, value2);
    return { height: value1, weight: value2, bmi };
  } catch (e) {
    return { error: `Error, something bad happened, message: ${e.message}` };
  }
};

export default bmiCalculator;

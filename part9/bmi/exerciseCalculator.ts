interface ExerciseReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseInput {
  daily_hours: number[];
  target: number;
}

const parseExerciseArguments = (args: string[]): ExerciseInput => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const n = args.length;
  const daily_hours: number[] = [];
  let target: number = 0;

  for (let i = 2; i <= n - 1; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error("Provided values were not numbers!");
    }
    if (i === 2) {
      target = Number(args[i]);
    } else {
      daily_hours.push(Number(args[i]));
    }
  }

  return {
    daily_hours,
    target,
  };
};

export const calculateExercises = (
  daily_hours: number[],
  target: number
): ExerciseReport => {
  const periodLength = daily_hours.length;
  const trainingDays = daily_hours.filter((hour) => hour > 0).length;
  const average = daily_hours.reduce((a, b) => a + b) / periodLength;
  const success = average >= target;
  let rating: 1 | 2 | 3;
  let ratingDescription: string;
  if (average / target > 1) {
    rating = 3;
    ratingDescription = "well done!";
  } else if (average / target > 0.5) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "you need to work harder!";
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

try {
  const { daily_hours, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(daily_hours, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

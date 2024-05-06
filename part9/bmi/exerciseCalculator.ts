interface ExerciseReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

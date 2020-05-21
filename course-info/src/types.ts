export interface ContentProps {
  courseParts: Array<CoursePart>;
}

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartBaseDescription extends CoursePartBase {
  description: string;
}

export interface CoursePartOne extends CoursePartBaseDescription {
  name: 'Fundamentals';
}

export interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

export interface CoursePartThree extends CoursePartBaseDescription {
  name: 'Deeper type usage';
  exerciseSubmissionLink: string;
}

export interface CoursePartFour extends CoursePartBaseDescription {
  name: 'My own course';
  averageHours: number;
}

export type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;

export interface AppProps {
  courseName: string;
  courseParts: Array<CoursePart>;
}

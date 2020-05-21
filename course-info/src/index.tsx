import React from 'react';
import ReactDOM from 'react-dom';
import { CoursePart } from './types';
import App from './App';

const courseName = 'Half Stack application development';

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: 'Fundamentals',
    exerciseCount: 10,
    description: 'This is an awesome course part',
  },
  {
    name: 'Using props to pass data',
    exerciseCount: 7,
    groupProjectCount: 3,
  },
  {
    name: 'Deeper type usage',
    exerciseCount: 14,
    description: 'Confusing description',
    exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
  },
  {
    name: 'My own course',
    exerciseCount: 5,
    description: 'This is prolly real boring',
    averageHours: 1000,
  },
];

ReactDOM.render(
  <App courseParts={courseParts} courseName={courseName} />,
  document.getElementById('root')
);

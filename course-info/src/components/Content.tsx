import React from 'react';
import { ContentProps, CoursePart } from '../types';
import Part from './Part';

const Content: React.FC<ContentProps> = (props) => {
  return (
    <div>
      {props.courseParts.map((coursePart: CoursePart) => (
        <Part key={coursePart.name} part={coursePart} />
      ))}
    </div>
  );
};

export default Content;

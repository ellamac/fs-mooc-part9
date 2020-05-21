import React from 'react';
import { AppProps } from './types';
import Content from './components/Content';
import Header from './components/Header';
import Total from './components/Total';

const App: React.FC<AppProps> = ({ courseName, courseParts }) => {
  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;

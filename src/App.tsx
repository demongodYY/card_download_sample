import * as React from 'react';
import './App.less';
import {data as datas} from '../assets/data.json';

import Card from './components/Card';

export interface HelloProps {}

export const App = () => {
  return (
    <div className="page-container">
      {datas.map((data, index) => {
        return <Card data={data} key={index} />;
      })}
    </div>
  );
};

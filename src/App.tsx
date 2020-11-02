import * as React from 'react';
import {numberStore$, asyncNumberStore$, jsonStore$} from './store/';
import {numAction} from './action';
import {useStoreState, useStoreAction} from './hooks';

export interface HelloProps {}

export const Hello = () => {
  const jsonValue = useStoreState(jsonStore$); //http 请求
  console.log(jsonValue);
  return (
    <div>
      <SubComponent1 />
      <SubComponent2 />
    </div>
  );
};

const SubComponent1 = () => {
  const numberValue = useStoreState(numberStore$);
  const setNumberValue = useStoreAction(numAction);
  return (
    <div>
      <h1>我是一个组件： {numberValue}</h1>
      <button
        onClick={() => {
          setNumberValue(numberValue * 2);
        }}
      >
        点我乘以2
      </button>
    </div>
  );
};

const SubComponent2 = () => {
  const numberValue = useStoreState(asyncNumberStore$);
  const setNumberValue = useStoreAction(numAction);
  return (
    <div>
      <h1>我是另外个异步组件： {numberValue}</h1>
      <button
        onClick={() => {
          setNumberValue(numberValue * 3);
        }}
      >
        异步乘以3
      </button>
    </div>
  );
};

import * as React from 'react';
import {useState} from 'react';
import './App.less';
import {data as datas} from '../assets/data.json';

import Card from './components/Card';
import * as DomToImage from 'dom-to-image';
import * as jsZip from 'jszip';

export interface HelloProps {}

export const App = () => {
  const [process, setProcess] = useState(1);
  const [loading, setLoading] = useState(false);
  const handleAllDownload = async () => {
    const zip = new jsZip();
    const img = zip.folder('images');
    const domToImage = DomToImage as any;
    const cardDoms = document.querySelectorAll('.card-wrapper');
    let index = 0;
    setLoading(true);
    for (const cardDom of Array.from(cardDoms)) {
      const [title] = datas[index];
      const pngData = await domToImage.toBlob(cardDom);
      img.file(`${title}.png`, pngData);
      setProcess(index + 1);
      index++;
    }
    const zipFile = await zip.generateAsync({type: 'blob'});
    const eleLink = document.createElement('a');
    eleLink.download = 'images.zip';
    eleLink.style.display = 'none';
    eleLink.href = URL.createObjectURL(zipFile);
    eleLink.click();
    eleLink.remove();
    setProcess(1);
    setLoading(false);
  };

  return (
    <div className="page-container">
      {loading ? (
        <div className="loading-mask">
          <h1> {`正在处理(${process}/${datas.length})...`}</h1>
        </div>
      ) : null}
      {datas.length ? (
        <div className="page-header">
          <button className="header-btn" onClick={handleAllDownload}>
            下载全部
          </button>
        </div>
      ) : null}
      {datas.map((data, index) => {
        return <Card data={data} key={index} />;
      })}
    </div>
  );
};

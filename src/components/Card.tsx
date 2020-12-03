import * as React from 'react';
import {useRef, useEffect, useState} from 'react';
import * as DomToImage from 'dom-to-image';
import './Card.less';
const footer1 = require('../../assets/footer1.png');
const footer2 = require('../../assets/footer2.png');
interface IPCard {
  data: string[];
}

interface IPHeader {
  point: string;
  forWho: string;
}

const Card: React.FC<IPCard> = ({data}) => {
  const [title, subTitle, desc, point, forWho, imgSrc] = data;
  const domRef = useRef(null);
  const domToImage = DomToImage as any;
  const handleClick = () => {
    domToImage.toPng(domRef.current).then(function (dataUrl: string) {
      var link = document.createElement('a');
      link.download = title;
      link.href = dataUrl;
      link.click();
      link.remove();
    });
  };
  const [maskShow, setMaskShow] = useState(false);
  return (
    <div
      className="card-container"
      onMouseOver={() => setMaskShow(true)}
      onMouseLeave={() => setMaskShow(false)}
    >
      <div className="card-wrapper" ref={domRef}>
        <Header point={point} forWho={forWho} />
        <Content
          title={title}
          subTitle={subTitle}
          desc={desc}
          imgSrc={imgSrc}
        />
        <Footer />
      </div>
      {maskShow ? (
        <div className="card-mask">
          <button className="card-btn" onClick={handleClick}>
            下载卡片图
          </button>
        </div>
      ) : null}
    </div>
  );
};

const Header: React.FC<IPHeader> = ({point, forWho}) => {
  const arrforWho = (forWho ?? '').match(/[\u4E00-\u9FFF\w]+/g);
  return (
    <div className="header">
      <div className="point">{point}</div>
      <div className="forWho">
        {arrforWho?.map((text, index) => {
          return (
            <div className="forWho-tip" key={index}>
              {text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Content: React.FC<{
  title: string;
  subTitle: string;
  desc: string;
  imgSrc: string;
}> = ({title, subTitle, desc, imgSrc}) => {
  return (
    <div className="content">
      <Banner src={imgSrc} />
      <h1>{title}</h1>
      <div className="subtitle">{subTitle}</div>
      <p>{desc}</p>
    </div>
  );
};

const Banner: React.FC<{src?: string}> = ({src = null}) => {
  const canvasRef = useRef(null);
  const imgWrapperRef = useRef(null);

  const getImgData = () => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = src;
    img.onload = () => {
      imgWrapperRef.current.appendChild(img);
    };
  };
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const drawDefault = () => {
      const draw: any = (ctx: any, width: any, height: any) => {
        if (width < 0 || height < 0) {
          return;
        }
        ctx.strokeRect(0, 0, width, height);
        ctx.translate(30, 30);
        return draw(ctx, width - 30 * 2, height - 30 * 2);
      };
      ctx.setLineDash([2, 28]);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#aaaaaa';
      draw(ctx, 900, 810);
    };

    drawDefault();
  };
  useEffect(() => {
    src ? getImgData() : drawCanvas();
  }, [canvasRef.current]);
  return src ? (
    <div className="img-wrapper" ref={imgWrapperRef}>
      {/* <img src={src}></img> */}
    </div>
  ) : (
    <canvas width="900" height="810" ref={canvasRef}></canvas>
  );
};

const Footer = () => {
  return (
    <div className="footer">
      <img src={footer1.default} alt="" />
      <img src={footer2.default} alt="" />
    </div>
  );
};

export default Card;

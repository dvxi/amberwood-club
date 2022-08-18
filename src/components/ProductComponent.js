import { Image } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';

export default function ProductComponent (props) {

  let defaultScale = 1.0;

  const moveX = -50 + props.mousePos.x + props.data.x;
  const moveY = -103 + props.mousePos.y + props.data.y;

  defaultScale = 1.0 - Math.abs(((moveX / (window.innerWidth / 2)) * .8));

  const [scale, setScale] = useState(defaultScale);

  const imageStyle = {
    width: '100px',
    height: '207px',
    transform: 'translate(' + moveX + 'px, ' + moveY + 'px) scale(' + (1.0 - Math.abs(((props.data.x / (window.innerWidth / 2)) * .85)))*scale + ')',
    transition: 'transform 300ms linear'
  }

  return (
    <div className="d-flex align-items-center justify-content-center py-5 position-absolute top-50 start-50" style={imageStyle} onMouseEnter={() => setScale(1.2)} onMouseLeave={() => setScale(1.0)}>
      <Image fluid src="/images/ProductComponentImage.png"/>
    </div>
  );

}

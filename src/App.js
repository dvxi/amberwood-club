import './custom.scss';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import ProductComponent from './components/ProductComponent';

function App() {

  const [globalCoords, setGlobalCoords] = useState({x: 0, y: 0});

  const [products, setProducts] = useState({
    item_1: {
      x: globalCoords.x,
      y: globalCoords.y,
    },
    item_2: {
      x: globalCoords.x,
      y: globalCoords.y,
    },
    item_3: {
      x: globalCoords.x,
      y: globalCoords.y,
    },
    item_4: {
      x: globalCoords.x,
      y: globalCoords.y,
    },
    item_5: {
      x: globalCoords.x,
      y: globalCoords.y,
    },
    item_6: {
      x: globalCoords.x,
      y: globalCoords.y,
    },
    item_7: {
      x: globalCoords.x,
      y: globalCoords.y,
    },
    item_8: {
      x: globalCoords.x,
      y: globalCoords.y,
    },
    item_9: {
      x: globalCoords.x,
      y: globalCoords.y,
    },
    item_10: {
      x: globalCoords.x,
      y: globalCoords.y,
    },
    item_11: {
      x: globalCoords.x,
      y: globalCoords.y,
    },
    item_12: {
      x: globalCoords.x,
      y: globalCoords.y,
    },
    item_13: {
      x: globalCoords.x,
      y: globalCoords.y,
    },
    item_14: {
      x: globalCoords.x,
      y: globalCoords.y,
    }
  });

  const [activeProducts, setActiveProducts] = useState({
    item_1: {
      x: globalCoords.x,
      y: globalCoords.y,
    },
    item_2: {
      x: globalCoords.x,
      y: globalCoords.y,
    },
    item_3: {
      x: globalCoords.x,
      y: globalCoords.y,
    },
    item_4: {
      x: globalCoords.x,
      y: globalCoords.y,
    },
    item_5: {
      x: globalCoords.x,
      y: globalCoords.y,
    },
    item_6: {
      x: globalCoords.x,
      y: globalCoords.y,
    },
    item_7: {
      x: globalCoords.x,
      y: globalCoords.y,
    },
    item_8: {
      x: globalCoords.x,
      y: globalCoords.y,
    },
    item_9: {
      x: globalCoords.x,
      y: globalCoords.y,
    },
    item_10: {
      x: globalCoords.x,
      y: globalCoords.y,
    },
    item_11: {
      x: globalCoords.x,
      y: globalCoords.y,
    }
  });

  // const [activeProducts, setActiveProducts] = useState([
  //   {
  //     x: globalCoords.x - 500,
  //     y: globalCoords.y - 50,
  //   },
  //   {
  //     x: globalCoords.x - 900,
  //     y: globalCoords.y + 400,
  //   },
  //   {
  //     x: globalCoords.x,
  //     y: globalCoords.y,
  //   },
  //   {
  //     x: globalCoords.x,
  //     y: globalCoords.y,
  //   },
  //   {
  //     x: globalCoords.x,
  //     y: globalCoords.y,
  //   },
  //   {
  //     x: globalCoords.x,
  //     y: globalCoords.y,
  //   },
  //   {
  //     x: globalCoords.x,
  //     y: globalCoords.y,
  //   },
  //   {
  //     x: globalCoords.x,
  //     y: globalCoords.y,
  //   },
  //   {
  //     x: globalCoords.x,
  //     y: globalCoords.y,
  //   },
  //   {
  //     x: globalCoords.x,
  //     y: globalCoords.y,
  //   },
  //   {
  //     x: globalCoords.x,
  //     y: globalCoords.y,
  //   },
  //   {
  //     x: globalCoords.x,
  //     y: globalCoords.y,
  //   }
  // ]);

  useEffect(() => {
    // 👇️ get global mouse coordinates
    const handleWindowMouseMove = event => {
      setGlobalCoords({
        x: - (event.screenX - (window.innerWidth / 2)) / 100,
        y: - (event.screenY - (window.innerHeight / 2)) / 100,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    placeOnCircle(400, Math.PI/2, []);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []);

  const placeOnCircle = (radius, startAngle, toDelete) => {

    console.log(products);

    let newProducts = { ...products }
    toDelete.forEach((item, index) => {
      delete newProducts[item];
    });

    const quantity = Object.keys(newProducts).length;
    const angleGap = 2*Math.PI / quantity;

    let actualAngle = startAngle;
    // console.log(products);
    for(let i=0; i < quantity; i++){
      // x^2 + y^2 = radius^2;
      // y = Math.sin(i)*x;
      //
      // x^2 + Math.sin(i)^2*x^2 = x^2(1+Math.sin(i)^2) = radius^2
      // x^2 = (radius^2)/(1+Math.sin(i)^2)

      if(actualAngle > 2*Math.PI) actualAngle -= 2*Math.PI;

      let x = Math.floor(Math.sqrt((Math.pow(radius,2))/(1+Math.pow(Math.tan(actualAngle),2))));
      // y^2 = radius^2 - x^2
      let y = Math.floor(Math.sqrt(Math.pow(radius,2) - Math.pow(x,2)));

      if (actualAngle > 1.5*Math.PI) {
        y *= -1;
      } else if (actualAngle > Math.PI) {
        x *= -1;
        y *= -1;
      } else if (actualAngle > .5*Math.PI) {
        x *= -1;
      }
      newProducts[Object.keys(newProducts)[i]].x = x;
      newProducts[Object.keys(newProducts)[i]].y = y;
      // console.log(x + " | " + y + " index: " + index + " | " + products["item_" + index].x + " | " + products["item_" + index].y);
      actualAngle += angleGap;
    }
    //console.log(newProducts);
    setActiveProducts(newProducts);
    // setProducts((prev) => ({
    //   ...prev,
    //   ["item_" + index]: {
    //     x: globalCoords.x - x,
    //     y: globalCoords.y - y
    //   }
    // }));
  }

  return (
    <>
    <Container fluid className="p-4 d-flex align-items-center justify-content-center vh-100 bg-light" style={{overflow: 'hidden'}}>
      <Row className="gy-5 text-white">
        {Object.keys(activeProducts).map((key, index) => (
          <Col xs={3} className="d-flex align-items-center justify-content-center" key={'col_' + index}>
            <ProductComponent key={'product_' + index} data={activeProducts[key]} mousePos={globalCoords} id={index}/>
            <h4>{activeProducts[key].x}, {activeProducts[key].y}</h4>
          </Col>
        ))}
      </Row>
      <Row className="position-absolute bottom-0 start-50 translate-middle-x">
        <Col>
          <div className="shadow rounded-3 p-4 px-5 mb-5 text-center bg-white">
            <Row>
              <Col>
                <IoChevronBack />
              </Col>
              <Col xs={8}>
                <p className="fs-5 fw-semibold">{globalCoords.x}, {globalCoords.y}</p>
              </Col>
              <Col>
                <IoChevronForward />
              </Col>
            </Row>
            <Button variant="danger" className="mx-3 p-3 px-5 mt-3" onClick={() => placeOnCircle(200, Math.PI/2, ['item_2', 'item_3'])}>Morskie</Button>
            <Button variant="light" className="mx-3 p-3 px-5 mt-3" onClick={() => placeOnCircle(300, Math.PI/2, ['item_1', 'item_5', 'item_10', 'item_2'])}>Morskie</Button>
            <Button variant="light" className="mx-3 p-3 px-5 mt-3" onClick={() => placeOnCircle(400, Math.PI/2, [])}>Morskie</Button>
            <Button variant="light" className="mx-3 p-3 px-5 mt-3" onClick={() => placeOnCircle(500, Math.PI/2, ['item_2'])}>Morskie</Button>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default App;

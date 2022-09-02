import './custom.scss';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import React, { useEffect, useState, useRef } from 'react';

import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import ProductComponent from './components/ProductComponent';
import QuizComponent from './components/QuizComponent';
import WelcomeComponent from './components/WelcomeComponent';
import defaultProducts from './productList';

function App() {

  const [globalCoords, setGlobalCoords] = useState({x: 0, y: 0});
  const [products, setProducts] = useState(defaultProducts);
  const [welcomeScreen, setWelcomeScreen] = useState(true);
  const [answerPoints, setAnswerPoints] = useState([]);

  const circleRadiuses = [200, 600, 900];

  const refs = useRef([]);

  useEffect(() => {

    const handleWindowMouseMove = event => {
      setGlobalCoords({
        x: - (event.screenX - (window.innerWidth / 2)) / 100,
        y: - (event.screenY - (window.innerHeight / 2)) / 100,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);


    makeCircles();
    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []);

  const handleStart = () => {

    refs.current[1].classList.remove('d-none');
    refs.current[0].classList.add('hidden');

    setTimeout(() => {
      refs.current[1].classList.add('visible');
      refs.current[1].classList.remove('hidden');
    }, 1000);

    setTimeout(() => {
      setWelcomeScreen(false);
    }, 2000)

  }

  const setPoints = (itemsToRecommend, add, questionIndex) => {

    let tempProducts = { ...products };
    let tempAnswerPoints = [ ...answerPoints ];
    tempAnswerPoints.push(itemsToRecommend);

    console.log(questionIndex);

      itemsToRecommend.forEach((item, index) => {
        add ? tempProducts[item].points += 1 : tempProducts[item].points -= 1
      });

      // console.log('tempProducts: ');
      // console.log(tempProducts);
      setProducts(tempProducts);
      makeCircles();

      setAnswerPoints(tempAnswerPoints);
  }

  const makeCircles = () => {

    // objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0))

    let productsArray = [];
    // console.log(products);
    // console.log(products[Object.keys(products)[9]]);

    for (let j=0; j < Object.keys(products).length; j++) {
      productsArray.push(products[Object.keys(products)[j]]);
      // console.log(productsArray[j].points);
      productsArray[productsArray.length - 1].name = Object.keys(products)[j];
    }
    // console.log(productsArray);
    productsArray.sort((a,b) => (a.points > b.points) ? -1 : ((b.points > a.points) ? 1 : 0));

    for (let i=0; i < 3; i++) {
      productsArray[i].category = 1;
    }
    for (let i=3; i < 9; i++) {
      productsArray[i].category = 2;
    }
    for (let i=9; i < productsArray.length - 1; i++) {
      productsArray[i].category = 3;
    }

    for (let i=0; i< circleRadiuses.length; i++) {
      let itemsToRender = [];

      for (let j=0; j < productsArray.length; j++) {

        let currProduct = productsArray[j];

        if (currProduct.category == i+1) {
          itemsToRender.push(currProduct);
        }
      }
      placeOnCircle(circleRadiuses[i], Math.PI/2, itemsToRender);
    }
  }

  const changePositions = (newData) => {

    let tempProducts = { ...products }

    newData.forEach((element, index) => {
      tempProducts[element.name].category = element.category;
    })

    setProducts(tempProducts);
    makeCircles();
  }

  const placeOnCircle = (radius, startAngle, items) => {

    let newProductsArray = [ ...items ]
    let newProducts = { ...products }
    const quantity = newProductsArray.length;
    const angleGap = 2*Math.PI / quantity;

    let actualAngle = startAngle;

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

      newProducts[newProductsArray[i].name].x = x;
      newProducts[newProductsArray[i].name].y = y;
      // console.log(newProductsArray[i]);

      actualAngle += angleGap;
    }

    setProducts(newProducts);
  }

  return (
    <>
    {welcomeScreen &&
      <div ref={(e) => { refs.current[0] = e }}>
        <WelcomeComponent toggle={handleStart}/>
      </div>
    }
    <Container ref={(e) => { refs.current[1] = e }} fluid className="p-4 d-flex align-items-center justify-content-center vh-100 bg-light hidden d-none">
      <Row className="gy-5">
        {Object.keys(products).map((key, index) => (
          <Col xs={3} className="d-flex align-items-center justify-content-center" key={'col_' + index}>
            <ProductComponent key={'product_' + index} data={products[key]} mousePos={globalCoords} id={index}/>
          </Col>
        ))}
      </Row>
      <QuizComponent setPoints={setPoints}/>
    </Container>
    </>
  );
}

export default App;

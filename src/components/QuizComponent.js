import { Row, Col, Button} from 'react-bootstrap';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import React, { useState } from 'react';

import questions from '../questionList';

export default function ProductComponent (props) {

  const [ currentQuestion, setCurrentQuestion ] = useState(questions[0]);
  const [ questionIndex, setQuestionIndex ] = useState(0);
  // let questionIndex = 0;

  const changeQuestion = (next) => {
    if(next && questionIndex < questions.length-1){
      setQuestionIndex(questionIndex + 1);
    } else if(questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }

    setCurrentQuestion(questions[questionIndex]);
  }

  return(
    <Row className="position-absolute bottom-0 start-50 translate-middle-x vw-100">
      <Col className="col-5 mx-auto">
        <div className="shadow rounded-3 p-4 px-5 mb-5 text-center bg-white">
          <Row className="mb-3">
            <Col>
              <Button className="btn btn-light" disabled={currentQuestion == questions[0]} onClick={() => changeQuestion(false)}><IoChevronBack/></Button>
            </Col>
            <Col xs={8}>
              <p className="fs-6 fw-semibold">{currentQuestion.title}</p>
            </Col>
            <Col>
              <Button className="btn btn-light" disabled={currentQuestion == questions[questions.length - 1]} onClick={() => changeQuestion(true)}><IoChevronForward/></Button>
            </Col>
          </Row>
          <Row>
          {currentQuestion.answers.map((answer, index) =>
            <Col key={"column_" + index}>
              <Button key={"answer_" + index} variant="light" className="btn btn-light w-100 h-100" onClick={() => props.setPoints(currentQuestion.recommended[index], true, questionIndex)}>{answer}</Button>
            </Col>
          )}
          </Row>
        </div>
      </Col>
    </Row>
  );
}

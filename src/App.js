import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Button,
  InputGroup,
  FormControl,
  Card
} from 'react-bootstrap';
import Circle from './Components/Circle';
import ScoreDialog from './Components/ScoreDialog';

const totalCircle = 36;
const initialCircleArr = Array.from({ length: totalCircle }, (_, i) => ({ [`cl_${i + 1}`]: false }));;
const cols = 6;

function App() {
  const [circles, setCircles] = useState(initialCircleArr);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [isRandomValue, setIsRandomValue] = useState(false);
  const [confirmWindow, setcConfirmWindow] = useState(false);

  const setCirclesValues = useCallback((arr) => {
    const k = arr[0];
    const v = !arr[1];
    const newArr = circles.map((item) => item[k] !== undefined ? { [k]: v } : item);
    setCircles(newArr);
  }, [circles]);

  useEffect(() => {
    if (isRandomValue) {
      const ranNumber = Math.floor(Math.random() * totalCircle) + 1;
      setCirclesValues([`cl_${ranNumber}`, false])
      setIsRandomValue(false);
    }
  }, [isRandomValue, setCirclesValues])


  const incScore = () => setScore(score + 1);
  const decScore = () => setScore(score - 1);

  const handleClick = (arr) => {
    if (!isPlaying) return;
    const isHit = circles.find((circle) => circle[arr[0]]);
    if (isHit) {
      setCircles(initialCircleArr);
      incScore();
      setIsRandomValue(true);
    }
    else {
      decScore()
    }

  }

  const resetPlay = () => {
    setCircles(initialCircleArr);
    setIsPlaying(false);
    setcConfirmWindow(true);
  }

  const play = () => {
    if (isPlaying) {
      resetPlay();
    } else {
      setIsPlaying(true);
      setIsRandomValue(true);
    }
  }

  const handleClose = () => {
    setcConfirmWindow(false);
    setScore(0);
  }

  const rows = Math.ceil(totalCircle / cols);

  const getRows = () => {
    const rowsData = [];
    for (let idx = 0; idx < rows; idx++) {
      const startIndex = idx * cols;
      const endIndex = startIndex + cols;
      rowsData.push(<div key={idx}>
        {

          circles.slice(startIndex, endIndex).map((circle) => {
            const circleArr = Object.entries(circle)[0];
            return (<Circle key={circleArr[0]} isSelected={circleArr[1]} handleClick={() => handleClick(circleArr)} />)
          })
        }
      </div>)

    }
    return rowsData;
  }

  return (
    <Container>
      <Card className="text-center">
        <Card.Header>
          <span className="float-left text-primary text-cente">HitCircle Game</span>
          <InputGroup className="float-right" style={{width: "200px"}}>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Score</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Score"
              aria-label="Score"
              aria-describedby="Score"
              readOnly
              value={score}
            />
          </InputGroup>
        </Card.Header>
        <Card.Body>
          {getRows()}
        </Card.Body>
        <Card.Footer>
          <Button onClick={play}>
            {isPlaying ? 'Stop' : 'Play'}
          </Button>
        </Card.Footer>
      </Card>



      <ScoreDialog score={score} confirmWindow={confirmWindow} handleClose={handleClose} />
    </Container>
  );
}

export default App;

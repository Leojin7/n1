import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './CodePuzzle.css';

const DraggableBlock = ({ block, index }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CODE_BLOCK',
    item: { block, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`code-block ${isDragging ? 'dragging' : ''}`}
    >
      {block.content}
    </div>
  );
};

const DroppableSlot = ({ index, onDrop, children }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'CODE_BLOCK',
    drop: (item) => onDrop(item, index),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`solution-slot ${isOver ? 'can-drop' : ''}`}
    >
      {children}
    </div>
  );
};

const CodePuzzle = () => {
  const [codeBlocks, setCodeBlocks] = useState([]);
  const [solution, setSolution] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [feedback, setFeedback] = useState('');

  const puzzles = [
    {
      blocks: [
        'function sum(a, b) {',
        '  return a + b;',
        '}'
      ],
      solution: [0, 1, 2],
      description: 'Create a function that adds two numbers'
    },
    {
      blocks: [
        'const num = [1, 2, 3];',
        'num.forEach((num) => {',
        '  console.log(num);',
        '});'
      ],
      solution: [0, 1, 2, 3],
      description: 'Create a forEach loop to print array elements'
    }
  ];

  useEffect(() => {
    initializePuzzle();
  }, [level]);

  const initializePuzzle = () => {
    const currentPuzzle = puzzles[level - 1];
    if (!currentPuzzle) {
      setFeedback('Congratulations! You completed all puzzles!');
      return;
    }

    const shuffledBlocks = [...currentPuzzle.blocks]
      .map((block, index) => ({ id: index, content: block }))
      .sort(() => Math.random() - 0.5);

    setCodeBlocks(shuffledBlocks);
    setSolution(new Array(currentPuzzle.blocks.length).fill(null));
    setFeedback('');
  };

  const handleDrop = (item, targetIndex) => {
    const newSolution = [...solution];
    const oldIndex = solution.findIndex(block => block?.id === item.block.id);
    
    if (oldIndex !== -1) {
      newSolution[oldIndex] = null;
    }
    
    newSolution[targetIndex] = item.block;
    setSolution(newSolution);
    
    // Update available code blocks
    const newBlocks = codeBlocks.filter(block => 
      !newSolution.some(solBlock => solBlock?.id === block.id)
    );
    setCodeBlocks(newBlocks);
  };

  const checkSolution = () => {
    const currentPuzzle = puzzles[level - 1];
    if (!currentPuzzle) return;

    const solutionIds = solution.map(block => block?.id);
    const isCorrect = currentPuzzle.solution.every(
      (correctId, index) => solutionIds[index] === correctId
    );

    if (isCorrect) {
      setScore(prevScore => prevScore + 100);
      setFeedback('Correct! Well done!');
      setTimeout(() => {
        if (level < puzzles.length) {
          setLevel(prevLevel => prevLevel + 1);
        } else {
          setFeedback('Congratulations! You completed all puzzles!');
        }
      }, 1500);
    } else {
      setFeedback('Not quite right. Try again!');
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="code-puzzle-container">
        <div className="puzzle-header">
          <h2>Code Puzzle - Level {level}</h2>
          <div className="puzzle-stats">Score: {score}</div>
        </div>

        <div className="puzzle-description">
          {puzzles[level - 1]?.description}
        </div>

        <div className="code-blocks-container">
          {codeBlocks.map((block, index) => (
            <DraggableBlock key={block.id} block={block} index={index} />
          ))}
        </div>

        <div className="solution-container">
          {solution.map((item, index) => (
            <DroppableSlot key={index} index={index} onDrop={handleDrop}>
              {item ? item.content : 'Drop code block here'}
            </DroppableSlot>
          ))}
        </div>

        <button className="check-solution-btn" onClick={checkSolution}>
          Check Solution
        </button>

        {feedback && (
          <div className={`feedback-message ${feedback.includes('Correct') ? 'success' : 'error'}`}>
            {feedback}
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default CodePuzzle;
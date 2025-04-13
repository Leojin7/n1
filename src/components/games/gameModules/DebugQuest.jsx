import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import './DebugQuest.css';

const DebugQuest = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [code, setCode] = useState('');
  const [score, setScore] = useState(0);
  const [hints, setHints] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [highlightedCode, setHighlightedCode] = useState('');
  const [lineNumbers, setLineNumbers] = useState([]);

  const challenges = [
    {
      code: `function calculateSum(arr) {
  let sum = 0;
  for (let i = 0; i <= arr.length; i++) {
    sum += arr[i]
  }
  return sum
}`,
      solution: `function calculateSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}`,
      hints: [
        'Check the loop condition (i <= vs i <)',
        'Look for missing semicolons',
        'Array indices should not exceed length-1'
      ],
      description: 'Fix the array sum function to properly handle array bounds and syntax'
    },
    {
      code: `class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element);
  }
  
  pop() {
    return this.items.pop;
  }
  
  peek() {
    return this.items[this.items.length];
  }
  
  isEmpty() {
    return this.items.length = 0;
  }
}`,
      solution: `class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element);
  }
  
  pop() {
    return this.items.pop();
  }
  
  peek() {
    return this.items[this.items.length - 1];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}`,
      hints: [
        'Check the pop method implementation',
        'Array length - 1 is the last index',
        'Assignment vs comparison operator'
      ],
      description: 'Debug the Stack class implementation to fix method errors'
    },
    {
      code: `async function fetchUserData(userId) {
  try {
    const response = await fetch('/api/users/' + userId);
    const data = response.json();
    return data
  } catch {
    console.log('Error fetching user data')
  }
}`,
      solution: `async function fetchUserData(userId) {
  try {
    const response = await fetch('/api/users/' + userId);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}`,
      hints: [
        'response.json() returns a Promise',
        'Error handling should be more informative',
        'Consider rethrowing the error'
      ],
      description: 'Fix the async function to properly handle API requests and errors'
    },
    {
      code: `function removeDuplicates(array) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (result.indexOf(array[i]) === -1) {
      result.push(array[i]);
    }
  }
  return result;
}`,
      solution: `function removeDuplicates(array) {
  return [...new Set(array)];
}`,
      hints: [
        'Consider using Set for unique values',
        'Spread operator can convert Set back to array',
        'Modern JS has better ways to handle this'
      ],
      description: 'Optimize the function to remove duplicates using modern JavaScript features'
    },
    {
      code: `function debounce(fn, delay) {
  let timeoutId;
  
  return function() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(fn, delay);
  }
}`,
      solution: `function debounce(fn, delay) {
  let timeoutId;
  
  return function(...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(context, args), delay);
  }
}`,
      hints: [
        'Function arguments are not being passed',
        'this context is lost',
        'Arrow function can help preserve context'
      ],
      description: 'Fix the debounce utility function to properly handle arguments and context'
    }
  ];

  useEffect(() => {
    if (challenges[currentLevel]) {
      setCode(challenges[currentLevel].code);
      highlightCode(challenges[currentLevel].code);
      updateLineNumbers(challenges[currentLevel].code);
    }
  }, [currentLevel]);

  const updateLineNumbers = (code) => {
    const lines = code.split('\n').length;
    setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1));
  };

  const highlightCode = (code) => {
    const highlighted = Prism.highlight(
      code,
      Prism.languages.javascript,
      'javascript'
    );
    setHighlightedCode(highlighted);
  };

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    highlightCode(newCode);
    updateLineNumbers(newCode);
  };

  const showNextHint = () => {
    if (hints.length < challenges[currentLevel].hints.length) {
      setHints([...hints, challenges[currentLevel].hints[hints.length]]);
    }
  };

  const checkSolution = () => {
    const currentChallenge = challenges[currentLevel];
    const normalizedUserCode = code.replace(/\s+/g, ' ').trim();
    const normalizedSolution = currentChallenge.solution.replace(/\s+/g, ' ').trim();

    if (normalizedUserCode === normalizedSolution) {
      setScore(prevScore => prevScore + 100);
      setFeedback('Great job! All bugs fixed correctly!');
      setTimeout(() => {
        if (currentLevel < challenges.length - 1) {
          setCurrentLevel(prevLevel => prevLevel + 1);
          setHints([]);
          setFeedback('');
        } else {
          setFeedback('Congratulations! You completed all challenges!');
        }
      }, 1500);
    } else {
      setFeedback('Not quite right. Try using the hints!');
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  return (
    <div className="debug-quest-container">
      <div className="debug-header">
        <h2>Debug Quest - Level {currentLevel + 1}</h2>
        <div className="debug-stats">
          <span>Score: {score}</span>
          <button className="hint-btn" onClick={showNextHint}>
            Get Hint {hints.length}/{challenges[currentLevel]?.hints.length}
          </button>
        </div>
      </div>

      <p className="challenge-description">
        {challenges[currentLevel]?.description}
      </p>

      <div className="code-editor">
        <div className="editor-toolbar">
          <span>JavaScript</span>
          <span>Fix the bugs in the code</span>
        </div>
        <div className="line-numbers">
          {lineNumbers.map(num => (
            <div key={num}>{num}</div>
          ))}
        </div>
        <textarea
          value={code}
          onChange={handleCodeChange}
          className="code-input"
          spellCheck="false"
          style={{ paddingLeft: '3rem' }}
        />
        <pre className="code-preview" style={{ paddingLeft: '3rem' }}>
          <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        </pre>
      </div>

      <div className="hints-panel">
        {hints.map((hint, index) => (
          <div key={index} className="hint-item">
            💡 {hint}
          </div>
        ))}
      </div>

      <button className="submit-btn" onClick={checkSolution}>
        Submit Solution
      </button>

      {feedback && (
        <div className={`feedback-message ${feedback.includes('Great') ? 'success' : 'error'}`}>
          {feedback}
        </div>
      )}
    </div>
  );
};

export default DebugQuest;
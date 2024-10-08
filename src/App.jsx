import React, { useState } from 'react';
import { sendWalkthroughRequest } from '../utils/api';
import './App.css';
import ReactMarkdown from 'react-markdown';
import logo from './logo.png';

const Walkthrough = () => {
  const [code, setCode] = useState('');
  const [conversation, setConversation] = useState([]);
  const [showInput, setShowInput] = useState(true);

  const handleWalkthrough = async () => {
    try {
      const result = await sendWalkthroughRequest(code);
      setConversation([{ role: 'user', content: code }, { role: 'system', content: result }]);
      setShowInput(false); // Switch to result view
    } catch (error) {
      console.error('Error in walkthrough:', error);
    }
  };

  const handleTryAgain = () => {
    setCode(''); // Reset input
    setConversation([]);
    setShowInput(true); // Switch back to input view
  };

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <div>
      <div className='walkthrucenter'>
        <h1 className='h1'>Walkthrough Helper</h1>
        <p className='p'>The walkthrough component is meant to help you analyze your code without directly debugging for you. By repeating your logic back to you step by step, the system attempts to help you catch and fix mistakes in your code snippet.</p>
        <div className='walkthrudiv'>
          <div className='inputwrapper'>
            {showInput ? (
                <textarea className='walkthruinput' value={code} onChange={handleChange} placeholder='Paste code here'></textarea>
            ) : (
              <div className='walkthruarea'>
                {conversation.map((msg, index) => (
                  <div key={index} className='flex'>
                    {msg.role === 'user' ? '' : (
                      <img src={logo} alt="CodeCoach Logo" className="logoimg" />
                    )}
                    <ReactMarkdown className={msg.role === 'user' ? 'walkthruuser' : 'botMessage'}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <button className="walkthrubutton" onClick={showInput ? handleWalkthrough : handleTryAgain}>
          {showInput ? 'Walk Through' : 'Try Again'}
        </button>
        <div style={{margin: 'auto', marginTop: '1.5rem', marginBottom: '1.5rem'}}>
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdENG5PPi3WU23tGhIR7CO6iP4zazp8lXqsw5Nsz8PH3k4rUg/viewform?embedded=true" width="640" height="200" frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe>
        </div>
      </div>
    </div>
  );
};

export default Walkthrough;

import React, { useState, useEffect } from 'react';
import { sendWalkthroughRequest } from '../utils/api';
import './App.css';
import ReactMarkdown from 'react-markdown';
import logo from './logo.png';
import { database } from './firebase';
import { ref, push } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Walkthrough = () => {
  const [code, setCode] = useState('');
  const [conversation, setConversation] = useState([]);
  const [showInput, setShowInput] = useState(true);
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false); // State for popup
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);
  
  const removeComments = (input) => {
    // Remove single-line comments
    input = input.replace(/#.*$/gm, '');
    // Remove multi-line comments
    input = input.replace(/('''[\s\S]*?'''|"""[\s\S]*?""")/gm, '');
    return input.trim();
  };

  const handleWalkthrough = async () => {
    if (!isAuthenticated) {
      alert("Please sign in to use this feature.");
      return;
    }
    try {
      const systemPrompt = 'You are a Python expert. For any code given, remove all comments and walk through the code line by line. Do not correct any code directly.';
      const sanitizedCode = removeComments(code);
      const result = await sendWalkthroughRequest(sanitizedCode);
      const newConversation = [
        { role: 'user', content: code },
        { role: 'system', content: result }
      ];
      setConversation(newConversation);
      setShowInput(false); // Switch to result view
      // Write the conversation to the Realtime Database
      const conversationRef = ref(database, 'conversations');
      await push(conversationRef, {
        timestamp: new Date().toISOString(),
        conversation: JSON.stringify(newConversation),
        prompt: systemPrompt
      });
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

  const sanitizeUserInput = (input) => input.replace(/>/g, '\\>');

  return (
    <div>
      <div className='walkthrucenter'>
        <h1 className='h1'>Walkthrough Helper</h1>
        <p className='p'>Walkthrough Helper is meant to help you understand your code by describing what it does step by step. This to help you find and fix mistakes in your code yourself. Paste the key parts of your code, e.g., a function or method definition. You can also add an example call to that function with output to guide the walkthrough.</p>

        <button className="privacyButton" onClick={() => setShowPrivacyPopup(true)}>What We Do with Your Data</button>

        {showPrivacyPopup && (
          <div className="privacyPopup">
            <div className="privacyContent">
              <h2>What We Do with Your Data</h2>
              <p>We keep your inputs and responses for data purposes to improve the walkthrough helper and refine our service. We do not gather any name or email information in order to keep chats anonymous. For more details on data usage, you can refer to the <a href="https://openai.com/consumer-privacy/" target="_blank" rel="noopener noreferrer">OpenAI API Data Privacy Policy</a>.</p>
              <button onClick={() => setShowPrivacyPopup(false)} className="closeButton">Close</button>
            </div>
          </div>
        )}

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
                      {msg.role === 'user' ? sanitizeUserInput(msg.content) : msg.content}
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
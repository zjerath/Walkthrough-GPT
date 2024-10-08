import axios from 'axios';

const sendWalkthroughRequest = async (code) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'For any code given, remove all comments and walk through the code without offering hints, but still while being helpful.' },
          { role: 'user', content: code },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error sending walkthrough request:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export { sendWalkthroughRequest };
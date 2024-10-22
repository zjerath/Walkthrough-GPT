import axios from 'axios';

const sendWalkthroughRequest = async (code) => {
  try {
    const response = await axios.post('https://walkthrough-gpt.vercel.app/api/walkthrough', { code });
    const json = await response.json()
    console.log(json)
    return response.data.content;
  } catch (error) {
    console.error('Error sending walkthrough request:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export { sendWalkthroughRequest };
import axios from 'axios';

const sendWalkthroughRequest = async (code) => {
  try {
    const response = await axios.post('api/walkthrough', { code });
    /* https://walkthrough-gpt.vercel.app/ */
    return response.data.message;
  } catch (error) {
    console.error('Error sending walkthrough request:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export { sendWalkthroughRequest };
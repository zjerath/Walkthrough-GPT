import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { code } = req.body;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'For any code given, remove all comments and walk through the code without offering hints, but still while being helpful.',
            },
            { role: 'user', content: code },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );

      res.status(200).json({ content: response.data.choices[0].message.content });
    } catch (error) {
      console.error('Error sending walkthrough request:', error);
      res.status(500).json({ error: 'Failed to process the request' });
    }
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed' });
  }
}
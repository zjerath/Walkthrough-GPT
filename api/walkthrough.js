import axios from 'axios';

export const dynamic = 'force-dynamic'; // Ensures dynamic rendering

export async function POST(request) {
  const { code } = await request.json();

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
          Authorization: `Bearer ${process.env.VITE_OPENAI_API_KEY}`,
        },
      }
    );
    return new Response(JSON.stringify({ content: response.data.choices[0].message.content }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process the request' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
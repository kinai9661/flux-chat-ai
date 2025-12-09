export async function POST(req) {
  const { messages } = await req.json();

  try {
    const response = await fetch('https://fluxes.zeabur.app/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 1'
      },
      body: JSON.stringify({
        model: 'xai/grok-2-1212',
        messages: messages,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return Response.json({ 
      content: data.choices[0].message.content 
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ 
      error: 'Chat failed',
      message: error.message
    }, { status: 500 });
  }
}
export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const response = await fetch('https://fluxes.zeabur.app/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 1'
      },
      body: JSON.stringify({
        model: 'xai/grok-2-1212',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的 AI 图像提示词优化助手。将用户简单的描述转换为详细、专业的图像生成提示词。提示词应该包含风格、光照、构图、细节等元素。直接返回优化后的提示词，不要有其他解释。'
          },
          {
            role: 'user',
            content: `请优化以下图像生成提示词，使其更详细和专业：\n\n${prompt}`
          }
        ],
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error('Optimization failed');
    }

    const data = await response.json();
    return Response.json({ 
      optimizedPrompt: data.choices[0].message.content,
      originalPrompt: prompt
    });
  } catch (error) {
    console.error('Optimize error:', error);
    return Response.json({ 
      optimizedPrompt: prompt,
      error: 'Optimization failed'
    }, { status: 500 });
  }
}
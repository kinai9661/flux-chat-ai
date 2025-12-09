import { nanoid } from 'nanoid';

export async function POST(req) {
  const { prompt, count = 1 } = await req.json();

  try {
    // 使用环境变量中的 FLUX API 端点
    const fluxEndpoint = process.env.FLUX_API_ENDPOINT || 'https://your-flux-api.com/generate';
    const fluxApiKey = process.env.FLUX_API_KEY;

    // 批量生成图片
    const generatePromises = Array(count).fill(null).map(async (_, index) => {
      try {
        const response = await fetch(fluxEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(fluxApiKey && { 'Authorization': `Bearer ${fluxApiKey}` })
          },
          body: JSON.stringify({ 
            prompt,
            width: 1024,
            height: 1024,
            num_inference_steps: 28
          })
        });

        if (!response.ok) {
          throw new Error(`Image generation failed: ${response.status}`);
        }
        
        const data = await response.json();
        const imageUrl = data.image_url || data.url || data.output?.[0];
        
        return {
          id: nanoid(),
          url: imageUrl,
          prompt: prompt,
          created_at: new Date().toISOString()
        };
      } catch (error) {
        console.error(`Image ${index + 1} generation error:`, error);
        // 返回一个占位符，避免整个批次失败
        return {
          id: nanoid(),
          url: `https://via.placeholder.com/1024x1024?text=Generation+Failed`,
          prompt: prompt,
          created_at: new Date().toISOString(),
          error: true
        };
      }
    });

    const images = await Promise.all(generatePromises);

    // 如果配置了数据库，保存到数据库
    if (process.env.POSTGRES_URL) {
      try {
        const { sql } = await import('@vercel/postgres');
        await Promise.all(images.map(async (img) => {
          if (!img.error) {
            await sql`
              INSERT INTO images (id, prompt, url, created_at)
              VALUES (${img.id}, ${img.prompt}, ${img.url}, NOW())
            `;
          }
        }));
      } catch (dbError) {
        console.error('Database save error:', dbError);
        // 即使数据库保存失败，也返回生成的图片
      }
    }

    return Response.json({ images: images.filter(img => !img.error) });
  } catch (error) {
    console.error('Generation error:', error);
    return Response.json({ 
      error: 'Generation failed',
      message: error.message
    }, { status: 500 });
  }
}
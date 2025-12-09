import { nanoid } from 'nanoid';

export async function POST(req) {
  const { 
    prompt, 
    count = 1, 
    model = 'flux-pro',
    width = 1024,
    height = 1024
  } = await req.json();

  try {
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
            width,
            height,
            model: model,
            num_inference_steps: model === 'flux-schnell' ? 4 : 28,
            guidance_scale: 7.5
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
          model: model,
          width: width,
          height: height,
          created_at: new Date().toISOString()
        };
      } catch (error) {
        console.error(`Image ${index + 1} generation error:`, error);
        return {
          id: nanoid(),
          url: `https://via.placeholder.com/${width}x${height}?text=Generation+Failed`,
          prompt: prompt,
          model: model,
          created_at: new Date().toISOString(),
          error: true
        };
      }
    });

    const images = await Promise.all(generatePromises);

    // 保存到数据库
    if (process.env.POSTGRES_URL) {
      try {
        const { sql } = await import('@vercel/postgres');
        await Promise.all(images.map(async (img) => {
          if (!img.error) {
            await sql`
              INSERT INTO images (id, prompt, url, model, width, height, created_at)
              VALUES (${img.id}, ${img.prompt}, ${img.url}, ${img.model}, ${img.width}, ${img.height}, NOW())
            `;
          }
        }));
      } catch (dbError) {
        console.error('Database save error:', dbError);
      }
    }

    return Response.json({ 
      images: images.filter(img => !img.error),
      model: model,
      settings: { width, height, count }
    });
  } catch (error) {
    console.error('Generation error:', error);
    return Response.json({ 
      error: 'Generation failed',
      message: error.message
    }, { status: 500 });
  }
}
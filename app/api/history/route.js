export async function GET() {
  try {
    // 检查是否配置了数据库
    if (!process.env.POSTGRES_URL) {
      return Response.json({ 
        images: [],
        message: 'Database not configured'
      });
    }

    const { sql } = await import('@vercel/postgres');
    
    const { rows } = await sql`
      SELECT * FROM images 
      ORDER BY created_at DESC 
      LIMIT 100
    `;
    
    return Response.json({ images: rows });
  } catch (error) {
    console.error('History fetch error:', error);
    return Response.json({ 
      error: 'Failed to fetch history',
      message: error.message,
      images: []
    }, { status: 500 });
  }
}
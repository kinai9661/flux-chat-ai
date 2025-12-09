// Database utility functions
// Only needed if using PostgreSQL for history feature

export async function initDatabase() {
  if (!process.env.POSTGRES_URL) {
    console.warn('POSTGRES_URL not configured. History feature will be disabled.');
    return;
  }

  try {
    const { sql } = await import('@vercel/postgres');
    
    // Create images table if not exists
    await sql`
      CREATE TABLE IF NOT EXISTS images (
        id VARCHAR(21) PRIMARY KEY,
        prompt TEXT NOT NULL,
        url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create index for faster queries
    await sql`
      CREATE INDEX IF NOT EXISTS idx_images_created_at 
      ON images(created_at DESC)
    `;

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

export async function saveImage(id, prompt, url) {
  if (!process.env.POSTGRES_URL) return;

  try {
    const { sql } = await import('@vercel/postgres');
    await sql`
      INSERT INTO images (id, prompt, url, created_at)
      VALUES (${id}, ${prompt}, ${url}, NOW())
    `;
  } catch (error) {
    console.error('Save image error:', error);
  }
}

export async function getImageHistory(limit = 100) {
  if (!process.env.POSTGRES_URL) return [];

  try {
    const { sql } = await import('@vercel/postgres');
    const { rows } = await sql`
      SELECT * FROM images 
      ORDER BY created_at DESC 
      LIMIT ${limit}
    `;
    return rows;
  } catch (error) {
    console.error('Get history error:', error);
    return [];
  }
}
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function initDB() {
  let client;
  try {
    client = await pool.connect();
    
    // Начинаем транзакцию
    await client.query('BEGIN');
    
    // Создаем таблицу site_requests
    await client.query(`
      CREATE TABLE IF NOT EXISTS site_requests (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        contact TEXT NOT NULL,
        task TEXT NOT NULL,
        deadline TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    
    // Проверяем существование таблицы orders
    const res = await client.query(`
      SELECT EXISTS (
        SELECT FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'orders'
      );
    `);
    
    if (!res.rows[0].exists) {
      console.log('Creating orders table...');
      await client.query(`
        CREATE TABLE orders (
          id SERIAL PRIMARY KEY,
          -- Добавьте минимальную структуру, если её нет
          user_id INTEGER,
          amount DECIMAL,
          status TEXT DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);
    }
    
    // Добавляем колонку payment_id
    await client.query(`
      ALTER TABLE orders
      ADD COLUMN IF NOT EXISTS payment_id TEXT;
    `);
    
    await client.query('COMMIT');
    console.log('✅ Database initialized successfully');
    
  } catch (error) {
    if (client) await client.query('ROLLBACK');
    console.error('❌ Database initialization failed:', error.message);
    throw error;
  } finally {
    if (client) client.release();
  }
}

// Добавьте проверку подключения
async function testConnection() {
  try {
    await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

module.exports = { pool, initDB };
const { Pool } = require('pg')

require('dotenv').config()

const pool = new Pool({
  user: process.env.PGUSER, // Make sure PGUSER is a superuser
  host: process.env.PGHOST,
  database: 'template1', // Should exist in all postgres databases by default
  password: process.env.PGPASSWORD,
  port: 5432
})

pool.on('error', e => {
  console.error('There was an error while generating the database structure!', e)
})

async function generate() {
  // Check if database exists
  const dbCheck = await pool.query("SELECT 1 FROM pg_database WHERE datname = 'logger'")
  if (dbCheck.rowCount === 0) {
    try {
      await pool.query("CREATE DATABASE logger")
      console.log("Database 'logger' created.")
    } catch (e) {
      console.error('Error creating database:', e)
      process.exit(1)
    }
  } else {
    console.log("Database 'logger' already exists, skipping creation.")
  }

  const loggerDB = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: 'logger',
    password: process.env.PGPASSWORD,
    port: 5432
  })
  await loggerDB.query('CREATE TABLE IF NOT EXISTS messages ( id TEXT PRIMARY KEY, author_id TEXT NOT NULL, content TEXT, attachment_b64 TEXT, ts TIMESTAMPTZ )')
  await loggerDB.query('CREATE TABLE IF NOT EXISTS guilds ( id TEXT PRIMARY KEY, owner_id TEXT NOT NULL, ignored_channels TEXT[], disabled_events TEXT[], event_logs JSON, log_bots BOOL, custom_settings JSON )')
  console.log('DB Generated or already up to date!')
  await loggerDB.end()
  await pool.end()
}

generate()

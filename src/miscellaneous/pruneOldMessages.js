require('dotenv').config();
const { Pool } = require('pg');

const MESSAGE_LIFESPAN_DAYS = parseInt(process.env.STORED_MESSAGE_LIFESPAN || '90', 10); // Default: 90 days
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: 'logger',
  password: process.env.PGPASSWORD,
  port: 5432
});

async function pruneOldMessages() {
  const cutoff = new Date(Date.now() - MESSAGE_LIFESPAN_DAYS * 24 * 60 * 60 * 1000);
  const editedCutoff = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000); // 2 months (60 days)
  try {
    const result = await pool.query(
      `DELETE FROM messages 
       WHERE ts < $1 
         AND (edited IS NULL OR edited < $2)
       RETURNING id`,
      [cutoff, editedCutoff]
    );
    console.log(`Pruned ${result.rowCount} messages older than ${MESSAGE_LIFESPAN_DAYS} days, except those edited in the last 2 months.`);
  } catch (e) {
    console.error('Error pruning old messages:', e);
  }
}

if (require.main === module) {
  pruneOldMessages().then(() => pool.end());
}

module.exports = pruneOldMessages;

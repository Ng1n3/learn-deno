import { MongoClient } from 'npm:mongodb';

const MONGODB_URI = Deno.env.get('MONGODB_URI') || '';
const DB_NAMME = Deno.env.get('DB_NAME') || '';

if (!MONGODB_URI) {
  console.log('MONGODB_URI is not set');
  Deno.exit(1);
}

const client = new MongoClient(MONGODB_URI);

try {
  await client.connect();
  await client.db('admin').command({ ping: 1 });
} catch (error) {
  console.error('Error connecting to MongoDB', error);
  Deno.exit(1);
}

const db = client.db(DB_NAMME);
const todos = db.collection('todos');

export { db, todos };

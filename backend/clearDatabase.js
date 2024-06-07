const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'math-worksheet';

async function clearCollection() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected correctly to server');
    
    const db = client.db(dbName);

    const result = await db.collection('scores').drop();
    console.log('Collection dropped:', result);
  } catch (err) {
    console.log('Error:', err);
  } finally {
    await client.close();
  }
}

clearCollection();

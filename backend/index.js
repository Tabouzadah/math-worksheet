const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = 'mongodb://localhost:27017'; // Ensure this URI is correct
const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });

let scoresCollection;

// Initialize MongoDB connection and start the server
async function startServer() {
  try {
    await client.connect();
    const db = client.db('math-worksheet');
    scoresCollection = db.collection('scores');
    console.log('Connected to MongoDB and initialized collection');

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

// Middleware to ensure scoresCollection is initialized
app.use((req, res, next) => {
  if (!scoresCollection) {
    console.error('scoresCollection is not initialized');
    return res.status(500).json({ error: 'Database not initialized' });
  }
  next();
});

// Endpoint to submit a new score
app.post('/scores', async (req, res) => {
  console.log('Handling POST /scores');
  try {
    const { name, score } = req.body;
    const newScore = { name, score, date: new Date() };
    await scoresCollection.insertOne(newScore);
    console.log('Inserted new score:', newScore);
    res.status(201).json(newScore);
  } catch (error) {
    console.error('Error inserting score:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to get the top scores
app.get('/scores', async (req, res) => {
  console.log('Handling GET /scores');
  try {
    const topScores = await scoresCollection.find().sort({ score: -1 }).limit(10).toArray();
    console.log('Fetched top scores:', topScores);
    res.json(topScores);
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

startServer();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
  }));

  app.post('/', async (req, res) => {
    const { messages } = req.body;
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3',
        messages: messages,
      }, {
        headers: {
          'Authorization': `Bearer sk-proj-JVPCs5SrWky0LWoFbiXbT3BlbkFJJRykFpYxihYWJ4sp48Kp`, // Remplacez par votre clé API
          'Content-Type': 'application/json'
        }
      });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

app.get('/', (req, res) => {
    res.status(405).json({ error: 'Method Not Allowed', message: 'Use POST method to chat.' });
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

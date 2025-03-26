const express = require('express');
const { HfInference } = require('@huggingface/inference');
const hf = new HfInference(process.env.HF_TOKEN);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/summarize', async (req, res) => {
  const text = req.body.text;
  const response = await hf.summarization({
    model: 'facebook/bart-large-cnn',
    inputs: text
  });
  res.json({ summary: response.summary_text });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = { hf }; // Export hf for use in other files like automate.js
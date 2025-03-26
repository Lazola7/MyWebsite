const { HfInference } = require('@huggingface/inference');
const hf = new HfInference(process.env.HF_TOKEN);

async function generateProductDescription(productName) {
  const response = await hf.textGeneration({
    model: 'google/flan-t5-xxl',
    inputs: `Write marketing copy for ${productName}:`
  });
  return response.generated_text;
}

// Example usage
(async () => {
  const description = await generateProductDescription('Smart Factory System');
  console.log('AI-Generated Description:', description);
})();
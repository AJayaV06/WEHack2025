const express = require('express');
const { VertexAI } = require('@google-cloud/vertexai');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const projectId = process.env.GOOGLE_CLOUD_PROJECT;
const region = process.env.GOOGLE_CLOUD_REGION;
const modelName = process.env.GEMINI_MODEL_NAME;
const apiKey = process.env.GEMINI_API_KEY;

// Initialize Vertex AI
const vertexAI = new VertexAI({
    project: projectId,
    location: region,
    apiKey: apiKey,
});

// Get the GenerativeModel instance using getGenerativeModel
const model = vertexAI.preview.getGenerativeModel({
    model: modelName,
});

app.post('/api/gemini-finance', async (req, res) => {
    const { question, context } = req.body;

    if (!question) {
        return res.status(400).json({ error: 'Question is required.' });
    }

    const promptText = `Answer the following finance question based on the provided context. If the answer is not directly available in the context, provide a concise and general financial explanation or definition.

    Question: ${question}

    ${context ? `Context: ${context}\n\n` : 'Provide a general financial explanation or definition.\n\n'}

    Answer: `;

    const request = {
        contents: [{ role: 'user', parts: [{ text: promptText }] }],
    };

    try {
        const response = await model.generateContent(request);
        const reply = response.response?.candidates?.[0]?.content?.parts?.[0]?.text || 'No answer available.';
        res.json({ response: reply });
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: 'Failed to get response from Gemini.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
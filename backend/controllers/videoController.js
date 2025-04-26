const axios = require('axios');

// D-ID API configuration
const D_ID_API_KEY = process.env.D_ID_API_KEY;
console.log(D_ID_API_KEY);
const D_ID_API_URL = 'https://api.d-id.com';

// Cache object to store video URLs (optional, to avoid regenerating same videos)
const videoCache = new Map();

const videoController = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }

        // Check cache first (optional)
        if (videoCache.has(text)) {
            return res.json({ videoUrl: videoCache.get(text) });
        }

        const authHeader = `Basic ${Buffer.from(`${D_ID_API_KEY}:`).toString('base64')}`;

        // 1. Create a talk
        const talkResponse = await axios.post(`${D_ID_API_URL}/talks`, {
            source_url: "https://img.freepik.com/free-photo/handsome-young-cheerful-man-with-arms-crossed_171337-1073.jpg?t=st=1745697062~exp=1745700662~hmac=56954e36a2c68567658764144430d83bfb9fa0bafdf9d53bb722edf0fe3b82cc&w=2000",
            script: {
                type: "text",
                input: text,
                provider: {
                    type: "microsoft",
                    voice_id: "en-IN-PrabhatNeural"
                }
            },
            config: {
                fluent: true,
                pad_audio: 0,
                stitch: true,
                result_format: "mp4"
            }
        }, {
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            }
        });

        const talkId = talkResponse.data.id;

        // 2. Poll for the result
        let videoUrl = null;
        let attempts = 0;
        const maxAttempts = 30;

        while (attempts < maxAttempts && !videoUrl) {
            const resultResponse = await axios.get(`${D_ID_API_URL}/talks/${talkId}`, {
                headers: {
                    'Authorization': authHeader
                }
            });

            if (resultResponse.data.status === 'done') {
                videoUrl = resultResponse.data.result_url;
                break;
            }

            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before next attempt
            attempts++;
        }

        if (!videoUrl) {
            throw new Error('Video generation timed out');
        }

        // Store in cache (optional)
        videoCache.set(text, videoUrl);

        res.json({ videoUrl });
    } catch (error) {
        console.error('Error generating AI video:', error.response?.data || error.message);
        res.status(500).json({ 
            message: 'Failed to generate AI video',
            error: error.response?.data || error.message
        });
    }
}

module.exports = { videoController };

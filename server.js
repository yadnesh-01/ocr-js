const express = require('express');
const cors = require('cors');
const multer = require('multer'); // For file uploads
const Tesseract = require('tesseract.js'); // Assuming you're using tesseract.js for OCR

const app = express();

// Enable CORS for all routes
app.use(cors());

const upload = multer({ dest: 'uploads/' });

app.post('/api/ocr', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const imagePath = req.file.path;

    // Perform OCR with Tesseract.js
    Tesseract.recognize(imagePath, 'eng')
        .then(({ data: { text } }) => {
            res.json({ success: true, text });
        })
        .catch((error) => {
            res.status(500).json({ success: false, error: 'OCR failed', details: error });
        });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

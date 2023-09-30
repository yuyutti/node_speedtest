const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' })); // ボディのサイズを増やす
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.static('public'));

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.get('/download-test', (req, res) => {
    const dataSize = parseInt(req.query.size, 10) || 1e6; // リクエストに応じたサイズのデータを生成
    const data = 'A'.repeat(dataSize);
    res.send(data);
});

app.post('/upload-test', (req, res) => {
    res.send('Data received');
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
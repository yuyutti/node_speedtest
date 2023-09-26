const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.static('public'));

// Pingテストのルート
app.get('/ping', (req, res) => {
    res.status(200).end();
});

// ダウンロードテストのルート
app.get('/download', (req, res) => {
    const randomSize = Math.floor(Math.random() * (100 * 1024 * 1024 - 1024 + 1) + 1024);
    const randomData = Buffer.alloc(randomSize, () => Math.floor(Math.random() * 256));
    res.send(randomData);
});

// アップロードテストのルート
app.post('/upload', (req, res) => {
    req.on('data', (chunk) => {
        // この例ではアップロードされたデータを処理せず破棄します。
        // 必要に応じてデータの処理を追加することができます。
    });
    req.on('end', () => {
        res.status(200).end();
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
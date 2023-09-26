const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.static('public'));

const dataPool = [];
const minSize = 1 * 1024 * 1024; // 1MB
const maxSize = 100 * 1024 * 1024; // 100MB
const numDataItems = 50; // データアイテムの数

for (let i = 0; i < numDataItems; i++) {
    const randomSize = Math.floor(Math.random() * (maxSize - minSize + 1) + minSize);
    const randomData = Buffer.alloc(randomSize, () => Math.floor(Math.random() * 256));
    dataPool.push(randomData);
}

// Pingテストのルート
app.get('/ping', (req, res) => {
    res.status(200).end();
});

// ダウンロードテストのルート
app.get('/download', (req, res) => {
    const randomIndex = Math.floor(Math.random() * dataPool.length);
    const randomData = dataPool[randomIndex];
    const dataSizeMB = (randomData.length / (1024 * 1024)).toFixed(2);
    console.log(`UP: ${dataSizeMB} MB`)
    res.send(randomData);
});

// アップロードテストのルート
app.post('/upload', (req, res) => {
    let receivedDataSize = 0;
    req.on('data', (chunk) => {
        receivedDataSize += chunk.length;
    });
    req.on('end', () => {
        const dataSizeMB = (receivedDataSize / (1024 * 1024)).toFixed(2);
        console.log(`Down: ${dataSizeMB} MB`);
        res.status(200).end();
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
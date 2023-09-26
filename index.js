const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use('/files', express.static('files'));

app.get('/download-for-time', (req, res) => {
    // 10秒間に送信するデータの量を設定
    const duration = 10 * 1000; // 10 seconds in milliseconds
    const chunkSize = 1024 * 1024; // 1MB

    res.setHeader('Transfer-Encoding', 'chunked');

    const interval = setInterval(() => {
        res.write(Buffer.alloc(chunkSize, '0'));
    }, 1000); // send 1MB every second

    setTimeout(() => {
        clearInterval(interval);
        res.end();
    }, duration);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

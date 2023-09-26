const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.static('public'));
app.use('/files', express.static('files'));

app.get('/download-for-time', (req, res) => {
    const chunkSize = 1024 * 1024 * 10; // 10MB
    res.setHeader('Content-Length', chunkSize);
    res.write(Buffer.alloc(chunkSize, '0'));
    res.end();
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

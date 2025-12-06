const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'home.html');
    res.sendFile(filePath);
})

app.get('/api/data', (req, res) => {
    const data = {
        message: "这是从服务器获取的数据！",
        timestamp: new Date().toLocaleString(),
        id: Math.floor(Math.random() * 100)
    };

    // res.json() 会自动设置 Content-Type 为 application/json
    res.json(data);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

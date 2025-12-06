const express = require('express');
const path = require('path');
const axios = require('axios');
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

app.get('/api/external-data', async (req, res) => {
    try {
        // 1. Express 服务器向外部 API 发起请求
        // 这里我们请求一个模拟用户的接口
        const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');

        // axios 返回的数据在 response.data 中
        const externalData = response.data;

        console.log('从外部获取的数据:', externalData);

        // 2. 可以在这里对数据进行清洗或重组（可选）
        const formattedData = {
            source: "数据来自 JSONPlaceholder 外部 API",
            name: externalData.name,
            email: externalData.email,
            company: externalData.company.name,
            website: externalData.website
        };

        // 3. 将处理后的数据返回给前端浏览器
        res.json(formattedData);

    } catch (error) {
        console.error('请求外部接口失败:', error.message);
        res.status(500).json({ error: '获取外部数据失败' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

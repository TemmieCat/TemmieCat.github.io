const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DATA_FILE = 'MyWebsiteUsers.json';

app.use(bodyParser.json());

// Проверяем существование файла данных
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]');
}

app.post('/save-user', (req, res) => {
    try {
        const userData = req.body;
        
        // Читаем текущие данные
        const currentData = JSON.parse(fs.readFileSync(DATA_FILE));
        
        // Добавляем новые данные
        currentData.push({
            ...userData,
            timestamp: new Date().toISOString()
        });
        
        // Сохраняем обратно в файл
        fs.writeFileSync(DATA_FILE, JSON.stringify(currentData, null, 2));
        
        res.status(200).send('Данные сохранены');
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка сервера');
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
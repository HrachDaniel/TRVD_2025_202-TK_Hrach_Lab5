const express = require('express');
const cors = require('cors');
const mustacheExpress = require('mustache-express');
const appRoutes = require('./routes/appRoutes');
const apiRoutes = require('./routes/apiRoutes'); 
const app = express(); 

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', appRoutes);
app.use('/api', apiRoutes); 

app.listen(port, () => {
    console.log(`Сервер успішно запущено на http://localhost:${port}`);
});
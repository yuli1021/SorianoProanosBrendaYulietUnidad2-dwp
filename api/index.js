const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); 

const dbURI = 'mongodb://mongo-db:27017/miBaseDeDatos';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('API is running correctly!');
});

const itemRoutes = require('./routes/items');
app.use('/items', itemRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

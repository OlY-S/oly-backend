const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const aiRoutes = require('./routes/aiRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
    res.send('Oly Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

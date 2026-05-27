const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./src/routes/authRoutes');
const pinRoutes = require('./src/routes/pinRoutes');
const userRoutes = require('./src/routes/userRoutes');
const saveRoutes = require('./src/routes/saveRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/pins', pinRoutes);
app.use('/api/users', userRoutes);
app.use('/api/saves', saveRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server draait op poort ${process.env.PORT}`);
});
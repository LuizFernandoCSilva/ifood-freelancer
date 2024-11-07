require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Configura o CORS para permitir requisições do frontend
app.use(cors({ origin: 'http://localhost:5173' })); // Substitua pela URL do frontend em produção

app.use(express.json());
app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB Atlas'))
.catch((error) => console.error('Erro ao conectar ao MongoDB Atlas:', error.message));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

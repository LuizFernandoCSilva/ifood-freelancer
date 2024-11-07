const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    //console.log("Dados recebidos no corpo da requisição:", req.body);
    const { userType, username, cpfCnpj, email, password } = req.body;
    try {
      const newUser = new User({ userType, username, cpfCnpj, email, password });
      await newUser.save();
      res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
      console.error("Erro ao registrar usuário:", error); // Loga o erro completo
      res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message });
    }
  });
  
 
module.exports = router;
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configurações do banco de dados
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('Token recebido:', token); // Log do token recebido

  if (!token) {
    console.log('Token não fornecido.');
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token inválido.', err);
      return res.status(403).json({ message: 'Token inválido.' });
    }
    req.user = user;
    next();
  });
};

// Rota de registro
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
  }

  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: 'Usuário já cadastrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
      [username, hashedPassword]
    );
    res.status(201).json({ id: result.rows[0].id, username });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
});

// Rota de login
// Rota de login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Usuário ou senha inválidos.' });
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error.message);
    res.status(500).json({ message: 'Erro ao fazer login.' });
  }
});


// Rota de check-in
app.post('/api/checkin', authenticateToken, async (req, res) => {
  const { emotion, comment } = req.body;
  const userId = req.user.id;

  if (!emotion || !comment) {
    return res.status(400).json({ message: 'Emoção e comentário são obrigatórios.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO checkins (user_id, emotion, comment) VALUES ($1, $2, $3) RETURNING *',
      [userId, emotion, comment]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao registrar check-in:', error);
    res.status(500).json({ message: 'Erro ao registrar check-in.' });
  }
});

// Rota para buscar check-ins
app.get('/api/checkin', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query('SELECT * FROM checkins WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar check-ins:', error);
    res.status(500).json({ message: 'Erro ao buscar check-ins.' });
  }
});

// Rota para verificar o dia do check-in
app.get('/api/checkin/today', authenticateToken, async (req, res) => {
  console.log('Requisição recebida para o check-in de hoje');
  const userId = req.user.id;
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  try {
    const result = await pool.query(
      'SELECT * FROM checkins WHERE user_id = $1 AND date >= $2 AND date <= $3',
      [userId, startOfDay, endOfDay]
    );

    if (result.rows.length > 0) {
      res.json({ timestamp: result.rows[0].date });
    } else {
      res.status(404).json({ message: 'Nenhum check-in encontrado para hoje.' });
    }
  } catch (error) {
    console.error('Erro ao buscar check-in:', error);
    res.status(500).json({ message: 'Erro ao buscar check-in.' });
  }
});

// Rota para buscar a última emoção registrada
app.get('/api/emotion/latest', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'SELECT emotion FROM checkins WHERE user_id = $1 ORDER BY date DESC LIMIT 1',
      [userId]
    );

    if (result.rows.length > 0) {
      res.json({ emotion: result.rows[0].emotion }); // Retorna apenas a última emoção encontrada
    } else {
      res.status(404).json({ message: 'Nenhum check-in encontrado para o usuário.' });
    }
  } catch (error) {
    console.error('Erro ao buscar última emoção:', error);
    res.status(500).json({ message: 'Erro ao buscar última emoção.' });
  }
});


// Rota para buscar médicos por especialidade
app.get('/api/medicos/:especialidade', async (req, res) => {
  const { especialidade } = req.params;

  if (!especialidade) {
    return res.status(400).json({ message: 'Especialidade é obrigatória.' });
  }

  try {
    const result = await pool.query('SELECT * FROM medicos WHERE especialidade = $1', [especialidade]);
    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ message: 'Nenhum médico encontrado para essa especialidade.' });
    }
  } catch (error) {
    console.error('Erro ao buscar médicos:', error);
    res.status(500).json({ message: 'Erro ao buscar médicos.' });
  }
});



// Rota para buscar horários disponíveis de um médico em uma data específica
app.get('/api/medicos/:id/horarios', async (req, res) => {
  const { id } = req.params;
  const { data } = req.query;

  console.log('ID do médico:', id);
  console.log('Data recebida no backend:', data);

  if (!data) {
    return res.status(400).json({ message: 'Data é obrigatória.' });
  }

  const dataSelecionada = new Date(data);
  const diaDaSemana = dataSelecionada.toLocaleString('pt-BR', { weekday: 'long' }).toLowerCase();

  try {
    const result = await pool.query(
      `SELECT horarios FROM medicos WHERE id = $1`,
      [id]
    );

    if (result.rows.length > 0) {
      const horarios = result.rows[0].horarios["Horários"];
      console.log('Horários encontrados:', horarios);

      if (horarios && horarios.length > 0) {
        res.json({ horarios });  // Retorna o array dentro de um objeto
      } else {
        res.status(404).json({ message: 'Nenhum horário disponível para esse dia.' });
      }
    } else {
      res.status(404).json({ message: 'Nenhum médico encontrado com o ID fornecido.' });
    }
  } catch (error) {
    console.error('Erro ao buscar horários:', error);
    res.status(500).json({ message: 'Erro ao buscar horários.' });
  }
});







// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

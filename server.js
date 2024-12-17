const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar cors


// Criar a aplicação Express
const app = express();

// Ativar o cors para todas as origens
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Configurar o parser para os dados do corpo da requisição
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',  // Endereço do seu servidor MySQL
    user: 'root',       // Usuário do MySQL
    password: 'Gabriel162225',       // Senha do MySQL
    database: 'barbearia'
});

// Conectar ao banco de dados MySQL
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados MySQL.');
    }
});

// Rota para receber o formulário de reserva
app.post('/reservar', (req, res) => {
    const { nome, telefone, data, hora } = req.body;

    // Validar os dados recebidos
    if (!nome || !telefone || !data || !hora) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    // Inserir a reserva no banco de dados
    const query = 'INSERT INTO reservas (nome, telefone, data, hora) VALUES (?, ?, ?, ?)';
    db.query(query, [nome, telefone, data, hora], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao salvar a reserva.' });
        }

        // Responder com uma confirmação
        res.status(200).json({ message: 'Reserva realizada com sucesso!', data: req.body });
    });
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

import express from "express";
import cors from 'cors';

const server = express();
server.use(cors());

server.use(express.json());

const exemplos = [];

server.get('/postagem' , (req, res)=> {
    res.send(exemplos);
});

server.post('/postagem', (req, res) => {
    const exemplo = req.body;
    exemplos.push(exemplo);
    res.send(exemplo);
});

server.listen(5000);
import express, { json } from "express";
import cors from 'cors';

const server = express();
server.use(cors());
server.use(json());

const users = [];
const tweets = [];

server.post('/sign-up', (req, res) => {
    const user = req.body;
    
    if(user.username.length === 0 || user.username.trim().length === 0 ){
        return res.status(400).send('Todos os campos são obrigatórios!')
    }

    if(user.avatar.length === 0 || user.avatar.trim().length === 0){
        return res.status(400).send('Todos os campos são obrigatórios!')
    }

    users.push(user);
    res.status(201).send(user);
});

server.get('/tweets' , (req, res)=> {
    if(!req.query.page || parseInt(req.query.page) < 1) {
        return res.status(400).send("Informe uma página válida!");
    }
    
    const page = parseInt(req.query.page);
    const limit = 10;
    const startIndex = (page - 1 ) * limit;
    const endIndex = page * limit;

    const primeiros10Tweets = [... tweets].reverse().slice(startIndex, endIndex);
    res.send(primeiros10Tweets);
});

server.post('/tweets', (req, res) => {    
    const currentUser = users.find(user => user.username === req.headers.user);
    const tweetWithAvatar = { tweet: req.body.tweet , username: req.headers.user , avatar: currentUser.avatar};

    if(tweetWithAvatar.username.length === 0 || tweetWithAvatar.username.trim().length === 0 ){
        return res.status(400).send('Todos os campos são obrigatórios!');
    }

    if(tweetWithAvatar.avatar.length === 0 || tweetWithAvatar.avatar.trim().length === 0){
        return res.status(400).send('Todos os campos são obrigatórios!');
    }

    if(tweetWithAvatar.tweet.length === 0 || tweetWithAvatar.tweet.trim().length === 0 ){
        return res.status(400).send('Todos os campos são obrigatórios!');
    }

    tweets.push(tweetWithAvatar);
    res.status(201).send(tweetWithAvatar);
})

server.get('/tweets/:username', (req, res) => {
    const tweetsFiltradosPorUsuario = tweets.filter(tweet => tweet.username === req.params.username);

    const tweetsFiltradosPorUsuarioComOrdemCorreta = tweetsFiltradosPorUsuario.reverse();

    res.send(tweetsFiltradosPorUsuarioComOrdemCorreta);
})

server.listen(5000);
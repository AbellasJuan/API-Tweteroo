import express from "express";
import cors from 'cors';

const server = express();
server.use(cors());

server.use(express.json());

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
    const primeiros10Tweets = tweets.slice(0-10);
    const primeiros10ComOrdemCorreta = primeiros10Tweets.reverse();
    res.send(primeiros10ComOrdemCorreta);
});

server.post('/tweets', (req, res) => {
    const tweet = req.body;
    const currentUser = users.find(user => user.username === tweet.username);
    const tweetWithAvatar = {...tweet, avatar: currentUser.avatar};
    
    if(tweetWithAvatar.username.length === 0 || tweetWithAvatar.username.trim().length === 0 ){
        return res.status(400).send('Todos os campos são obrigatórios!')
    }

    if(tweetWithAvatar.avatar.length === 0 || tweetWithAvatar.avatar.trim().length === 0){
        return res.status(400).send('Todos os campos são obrigatórios!')
    }

    if(tweetWithAvatar.tweet.length === 0 || tweetWithAvatar.tweet.trim().length === 0 ){
        return res.status(400).send('Todos os campos são obrigatórios!')
    }

    tweets.push(tweetWithAvatar);
    res.status(201).send(tweetWithAvatar);
})

server.listen(5000);
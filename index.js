import express from "express";
import cors from 'cors';

const server = express();
server.use(cors());

server.use(express.json());

const users = [];
const tweets = [];

server.get('/tweets' , (req, res)=> {
    const primeiros10Tweets = tweets.slice(0-10);
    
    res.send(primeiros10Tweets);
});

server.post('/sign-up', (req, res) => {
    const user = req.body;
    users.push(user);
    console.log(user.avatar);
    res.send('OK');
});

server.post('/tweets', (req, res) => {
    const tweet = req.body;
    
    const exemplo = {...tweet, testePropriedade: 'teste'}
    console.log(exemplo, users);
   
    tweets.push(tweet);
    res.send('OK');
})

server.listen(5000);
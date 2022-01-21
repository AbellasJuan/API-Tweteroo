import express from "express";
import cors from 'cors';

const server = express();
server.use(cors());

server.use(express.json());

const tweets = [];

server.get('/tweets' , (req, res)=> {
    res.send(tweets);
});

server.post('/sign-up', (req, res) => {
    res.send('OK');
});

server.post('/tweets', (req, res) => {
    const tweet = req.body;
    tweets.push(tweet);
    res.send('OK');
})

server.listen(5000);
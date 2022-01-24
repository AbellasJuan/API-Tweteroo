import express from "express";
import cors from 'cors';

const server = express();
server.use(cors());

server.use(express.json());

const users = [];
const tweets = [];

server.post('/sign-up', (req, res) => {
    const user = req.body;

    console.log(user)
    console.log(user.avatar.length)
    
    if(user.username.length === 0){
        return res.sendStatus(400);
    }

    if(user.avatar.length === 0){
        return res.sendStatus(400);
    }
    
    users.push(user);
    res.send('OK');
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
    tweets.push(tweetWithAvatar);
    res.send('OK');
})

server.listen(5000);
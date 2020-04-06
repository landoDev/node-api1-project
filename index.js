const express = require('express');
const shortid = require('shortid')

const server = express();

let users = [
    {
        id: shortid.generate(),
        name: "Kratos",
        bio: "BOY!"
    }
]

// don't forget the middleware!
server.use(express.json())

server.post('/api/users', (req, res) =>{
    const newUser = req.body;
    users.push(newUser)
    res.status(200).json(newUser)
})

const port = 5000;
server.listen(port, () => console.log(`* Server running on ${port} **`))

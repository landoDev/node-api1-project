const express = require('express');
const shortid = require('shortid')

const server = express();

let users = [
    {
        id: 1,
        name: "Kratos",
        bio: "BOY!"
    }
]

// don't forget the middleware!
server.use(express.json())

server.post('/api/users', (req, res) =>{
    const newUser = req.body;
    if(newUser.name == "" || newUser.bio == ""){
        return res.status(400).json({errorMessage: "Please provide name and bio for the user"}) 
    } else {
            newUser.id = shortid.generate();
            console.log(newUser); 
            users.push(newUser)
            return res.status(201).json(users);
    }
    // THE BELOW CODE RESULTS IN AN ERROR EVEN THOUGH CODE WORKS CAN'T DO TERNARY WITH MULTIPLE CHECKS IN RESPONSE
    // newUser.name == "" && newUser.bio == "" ?  res.status(400).json({errorMessage: "Please provide name and bio for the user"}) 
    // :
    // newUser.id = shortid.generate();
    // console.log(newUser); 
    // users.push(newUser)
    // res.status(200).json(users);
});

server.get('/api/users/:id', (req, res) =>{
    const userId = req.params.id;

    const foundUser = users.find(user => user.id == userId);
    foundUser ? res.status(200).json(foundUser) : res.status(400).json({message: "The user with the specified ID does not exist." })

})
const port = 5000;
server.listen(port, () => console.log(`* Server running on ${port} **`));

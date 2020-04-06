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
    if(newUser.name == "" || newUser.bio == ""){
        return res.status(400).json({errorMessage: "Please provide name and bio for the user"}) 
    } else {
            newUser.id = shortid.generate();
            console.log(newUser); 
            users.push(newUser)
            return res.status(200).json(users);
    }
    // THE BELOW CODE RESULTS IN AN ERROR EVEN THOUGH CODE WORKS CAN'T DO TERNARY WITH MULTIPLE CHECKS IN RESPONSE
    // newUser.name == "" && newUser.bio == "" ?  res.status(400).json({errorMessage: "Please provide name and bio for the user"}) 
    // :
    // newUser.id = shortid.generate();
    // console.log(newUser); 
    // users.push(newUser)
    // res.status(200).json(users);
});

const port = 5000;
server.listen(port, () => console.log(`* Server running on ${port} **`));

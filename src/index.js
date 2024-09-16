const express = require("express");
const {userModel, todoModel} = require("./db");
const jwt = require("jsonwebtoken");
const mongoose  = require("mongoose");
const JWT_SECRET = "asdasd123@123"

mongoose.connect("mongodb+srv://kuslhhh:S1MK5OaVN0HRnuN8@kushhh.yobcs.mongodb.net/todoist")
const app = express();
app.use(express.json());

app.post("/signup", async (req, res ) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    
    await userModel.create({
        email: email,
        password: password,
        name: name
    })

    res.json({
        message: "You are logged in"
    })
})
app.post("/signin", async (req, res ) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userModel.findOne({
        email: email,
        password: password,
    })

    console.log(user);
    

    if(user){
        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET);

        res.json({
            token: token,
        })
    } else{
        res.status(403).json({
          message: "Invalid credentials"  
        })
    }

})
app.post("/todo", auth, (req, res ) => {
    const userId = req.userId;
    const title = req.body.title;

    todoModel.create({
        title,
        userId
    })

    res.json({
        userId: userId,  
    })
})
app.get("/todos", auth, (req, res ) => {
    const userId = req.userId;
    const users =  todoModel.find({
        userId: userId
    })
    
    res.json({
        todos  
    })
})

function auth (req, res, next) {
    const token = req.headers.token;

    const decodeData = jwt.verify(token, JWT_SECRET);

    if(decodeData) {
        req.userId = decodeData.id;
        next();
    } else{
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
}



app.listen(3000);


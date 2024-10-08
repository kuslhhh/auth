require("dotenv").config();

const express = require("express");
const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const { z } = require("zod");

const { userModel, todoModel } = require("./db");
const mongoose = require("mongoose");
mongoose.connect(
    ""
);

const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
    
        const requireBody = z.object({
            email: z.string().min(3).max(100).email(),
            name : z.string().min(3).max(50),
            password: z.string().min(3).max(30).regex(/[A-Z]/),
        })

        const parsedData = requireBody.safeParse(req.body);

        if(!parsedData.success) {
            res.json({
                message: "Invalid data",
                error: parsedData.error
            })
            return;
        }

        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;

        const hashedp = await bcrypt.hash(password, 10);

        await userModel.create({
            email: email,
            password: hashedp,
            name: name
        });

        return res.json({ message: "You are signed up" });  
});


app.post("/signin", async function (req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const response = await userModel.findOne({ email: email });

        
        if (!response) {
            return res.status(403).json({ message: "User not found" }); 
        }

        
        const passwordMatch = await bcrypt.compare(password, response.password);

        if (passwordMatch) {
            const token = jwt.sign({ id: response._id.toString() }, JWT_SECRET);
            return res.json({ token }); 
        } else {
            return res.status(403).json({ message: "Incorrect creds" });        
        }
    } catch (e) {
        return res
            .status(500)
            .json({ message: "Error signing in", error: e.message }); 
    }
});

app.post("/todo", auth, async function (req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await todoModel.create({
        userId,
        title,
        done,
    });

    res.json({
        message: "Todo created",
    });
});

app.get("/todos", auth, async function (req, res) {
    const userId = req.userId;

    const todos = await todoModel.find({
        userId,
    }).populate("userId").exec();

    const id = todos.map((todo) => todo._id);
    const title = todos.map((todo) => todo.title);

    res.json({
        title,
    });
});

const port = process.env.PORT || 3000;

app.port = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${port}`);
});

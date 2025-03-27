import express from "express";
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import { ContentModel, LinkModel, UserModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { Authentication } from "./middleware";
// import * as bcrypt from 'bcrypt'; 
import { random } from "./util";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors())
app.use(cors({ origin: "*" }));
  // const saltRounds = 10; 

app.post("/api/vi/signup", async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    // const salt=await bcrypt.genSalt(saltRounds)
    // const hashedPassword=await bcrypt.hash(password,salt)
    try {
        await UserModel.create({
            username: username,
            password: password
        })
        res.json({
            message: "You are signed up"
        })
    } catch (e) {
        res.status(411).json({
            message: "Username already exists"
        })
    }

})
app.post("/api/vi/signin", async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    // const salt=await bcrypt.genSalt(saltRounds)
    // const hashedPassword=await bcrypt.hash(password,salt)

    const existingUser = await UserModel.findOne({
        username: username,
        password: password
    })
    if (existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD)
        res.send({
            token
        })
    } else {
        res.status(411).json({
            message: "Invalid credentials"
        })
    }
})
app.post("/api/vi/content", Authentication, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        link,
        type,
        title: req.body.title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content added"
    })
})
app.get("/api/vi/content", Authentication, async (req, res) => {
    //@ts-ignore
    const userId = req.userId
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.send({
        content
    })
})
app.delete("/api/vi/content", Authentication, async (req, res) => {
    const contentId = req.body.contentId
    await ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    })
    res.send({
        message: "Content deleted"
    })
})
app.post("/api/vi/brain/share", Authentication, async (req, res) => {
    const share = req.body.share
    if (share) {
        const existingLink = await LinkModel.findOne({
            // @ts-ignore
            userId: req.userId
        })
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            })
            return;
        }
        const hash = random(10)
        await LinkModel.create({
            // @ts-ignore
            userId: req.userId,
            hash: hash
        })
        res.send({
            Link: hash
        })
    } else {
        await LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        })
        res.send({
            message: "Removed Link"
        })
    }
})
app.post("/api/vi/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink
    const link = await LinkModel.findOne({
        hash
    })
    if (!link) {
        res.status(404).json({
            message: "Content not found"
        })
    }
    else {
        const content = await ContentModel.find({
            // @ts-ignore
            userId: link.userId
        })
        const user = await UserModel.findOne({
            //@ts-ignore
            _id: link.userId
        })

        if (!user) {
            res.sendStatus(404).json({
                message: "Link invalid"
            })
            return;
        }

        res.send({
            username: user?.username,
            content: content
        })
    }

})
app.listen(3000);
